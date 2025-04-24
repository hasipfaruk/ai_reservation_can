'use client';

import { useEffect, useState } from 'react';

type Table = {
  id: number;
  number: number;
  capacity: number;
  isAvailable: boolean;
  location: string;
};

type Reservation = {
  id: number;
  name: string;
  phone: string;
  numberOfPersons: number;
  time: string;
  reservationDate: string;
  status: string;
  createdAt: string;
  tableId?: number | null;
  table?: Table | null;
};

type FormData = {
  id?: number;
  name: string;
  phone: string;
  numberOfPersons: number | string;
  time: string;
  reservationDate: string;
  status: string;
  tableId?: number | null;
  reassignTable?: boolean;
};

// Create a global event for reservation updates
export const refreshReservations = () => {
  // Create a custom event that components can listen for
  const event = new CustomEvent('refresh-reservations');
  window.dispatchEvent(event);
};

export default function ReservationTable() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [tables, setTables] = useState<Table[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const [showForm, setShowForm] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    numberOfPersons: '',
    time: '',
    reservationDate: '',
    status: 'pending',
    tableId: null,
    reassignTable: false
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [initialSetupDone, setInitialSetupDone] = useState<boolean>(false);
  const [tablesEnabled, setTablesEnabled] = useState<boolean>(false);
  const [availableTables, setAvailableTables] = useState<Table[]>([]);
  const [showAvailableTables, setShowAvailableTables] = useState<boolean>(false);

  const fetchReservations = async () => {
    try {
      setLoading(true);
      // Add a cache-busting parameter to prevent caching
      const response = await fetch('/api/reservations?t=' + new Date().getTime());
      const data = await response.json();
      
      if (data.success) {
        console.log("Received reservations:", data.reservations);
        setReservations(data.reservations);
        setLastRefresh(new Date());
      } else {
        setError('Failed to fetch reservations');
      }
    } catch (err) {
      setError('Error connecting to the server');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTables = async () => {
    if (!tablesEnabled) return;
    
    try {
      // Fetch tables
      const response = await fetch('/api/tables');
      const data = await response.json();
      
      if (data.success) {
        console.log("Received tables:", data.tables);
        setTables(data.tables);
        
        if (data.tables && data.tables.length > 0) {
          setTablesEnabled(true);
        }
      } else {
        console.log("Tables not available:", data.message);
      }
    } catch (err) {
      console.error('Error fetching tables:', err);
    }
  };

  const forceCreateTables = async () => {
    try {
      // Call the direct table creation endpoint
      const response = await fetch('/api/create-tables');
      const data = await response.json();
      
      if (data.success) {
        console.log("Tables created:", data.tables);
        alert(`Successfully created ${data.tables.length} tables!`);
        setTables(data.tables);
        setTablesEnabled(true);
        
        // Refresh reservations to update the UI
        await fetchReservations();
      } else {
        console.error("Failed to create tables:", data.error);
        alert(`Failed to create tables: ${data.error}`);
      }
    } catch (err) {
      console.error('Error creating tables:', err);
      alert('Error creating tables. See console for details.');
    }
  };

  const initializeTables = async () => {
    try {
      // First try to check if tables API is available
      const response = await fetch('/api/tables');
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setTablesEnabled(true);
          console.log("Tables API is available");
          
          if (data.tables && data.tables.length > 0) {
            setTables(data.tables);
          } else {
            // Try to seed tables
            try {
              const seedResponse = await fetch('/api/tables/seed');
              if (seedResponse.ok) {
                const seedData = await seedResponse.json();
                console.log("Table initialization response:", seedData);
                
                // Fetch tables again after seeding
                if (seedData.success) {
                  await fetchTables();
                }
              } else {
                console.log("Table seeding not available");
                setTablesEnabled(false);
              }
            } catch (err) {
              console.error('Error seeding tables:', err);
              setTablesEnabled(false);
            }
          }
        } else {
          console.log("Tables API not fully available:", data.message);
          setTablesEnabled(false);
        }
      } else {
        console.log("Tables API not available");
        setTablesEnabled(false);
      }
    } catch (err) {
      console.error('Error initializing tables:', err);
      setTablesEnabled(false);
    } finally {
      setInitialSetupDone(true);
    }
  };

  useEffect(() => {
    fetchReservations();
    initializeTables();
    
    // Listen for the refresh event (from AI component)
    const handleRefreshEvent = () => {
      console.log("Refresh event triggered, fetching reservations");
      fetchReservations();
    };
    window.addEventListener('refresh-reservations', handleRefreshEvent);
    
    return () => {
      window.removeEventListener('refresh-reservations', handleRefreshEvent);
    };
  }, []);

  // Filter tables based on party size
  const getAvailableTables = () => {
    if (!tablesEnabled || !formData.numberOfPersons) return [];
    
    try {
      const partySize = Number(formData.numberOfPersons);
      return tables.filter(table => table.capacity >= partySize && table.isAvailable);
    } catch (error) {
      return [];
    }
  };

  const handleEdit = (reservation: Reservation) => {
    setFormData({
      id: reservation.id,
      name: reservation.name,
      phone: reservation.phone,
      numberOfPersons: reservation.numberOfPersons,
      time: reservation.time,
      reservationDate: reservation.reservationDate,
      status: reservation.status,
      tableId: reservation.tableId,
      reassignTable: false
    });
    setIsEditing(true);
    setShowForm(true);
    setFormError(null);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this reservation?')) {
      return;
    }

    try {
      const response = await fetch(`/api/reservation?id=${id}`, {
        method: 'DELETE'
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Remove from the local state
        setReservations(reservations.filter(r => r.id !== id));
      } else {
        alert('Failed to delete reservation: ' + data.message);
      }
    } catch (err) {
      console.error('Error deleting reservation:', err);
      alert('Error deleting reservation');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // If changing number of persons, reset table selection to enable auto-assignment
    if (tablesEnabled && name === 'numberOfPersons' && formData.tableId) {
      setFormData(prev => ({ ...prev, tableId: null, reassignTable: true }));
      
      // Check for available tables when party size changes
      if (value && formData.reservationDate && formData.time) {
        checkAvailableTables(parseInt(value), formData.reservationDate, formData.time);
      }
    }
    
    // If date or time changes, check available tables
    if (tablesEnabled && (name === 'reservationDate' || name === 'time') && 
        formData.numberOfPersons && formData.reservationDate && formData.time) {
      checkAvailableTables(
        parseInt(formData.numberOfPersons.toString()), 
        name === 'reservationDate' ? value : formData.reservationDate, 
        name === 'time' ? value : formData.time
      );
    }
  };

  // Add function to check available tables
  const checkAvailableTables = async (persons: number, date: string, time: string) => {
    try {
      // Mock API call for checking available tables
      const response = await fetch(`/api/tables/available?persons=${persons}&date=${date}&time=${time}`);
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.tables) {
          setAvailableTables(data.tables);
          setShowAvailableTables(true);
        } else {
          setAvailableTables([]);
        }
      }
    } catch (error) {
      console.error('Error checking available tables:', error);
      setAvailableTables([]);
    }
  };

  const handleTableChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!tablesEnabled) return;
    
    const value = e.target.value;
    setFormData({ 
      ...formData, 
      tableId: value ? parseInt(value) : null,
      reassignTable: false  // User manually selected a table
    });
  };

  const handleReassignTable = () => {
    if (!tablesEnabled) return;
    
    setFormData(prev => ({ 
      ...prev, 
      tableId: null,
      reassignTable: true
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    
    // Validate form data
    if (!formData.name || !formData.phone || !formData.numberOfPersons || 
        !formData.time || !formData.reservationDate || !formData.status) {
      setFormError('All fields are required');
      return;
    }
    
    try {
      const method = isEditing ? 'PUT' : 'POST';
      const url = '/api/reservation';
      
      // Ensure a table is assigned if tables are enabled
      let submissionData = {...formData};
      
      if (tablesEnabled && !submissionData.tableId && !submissionData.reassignTable) {
        // Find an appropriate table
        const partySize = Number(submissionData.numberOfPersons);
        const availableTables = tables.filter(table => table.capacity >= partySize && table.isAvailable);
        
        if (availableTables.length > 0) {
          // Sort by capacity to get closest match
          const sortedTables = [...availableTables].sort((a, b) => a.capacity - b.capacity);
          submissionData.tableId = sortedTables[0].id;
          console.log(`Automatically assigned table ${sortedTables[0].number} (capacity: ${sortedTables[0].capacity})`);
        } else {
          console.log("No suitable table found for automatic assignment");
          submissionData.reassignTable = true;
        }
      }
      
      // Don't send table data if tables are not enabled
      if (!tablesEnabled) {
        submissionData = {
          id: formData.id,
          name: formData.name,
          phone: formData.phone,
          numberOfPersons: formData.numberOfPersons,
          time: formData.time,
          reservationDate: formData.reservationDate,
          status: formData.status
        };
      }
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(isEditing ? submissionData : { ...submissionData, createDirect: true })
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Refresh the reservation list
        fetchReservations();
        
        // Reset form and close it
        resetForm();
        setShowForm(false);
        
        // Show all available tables if returned by the API
        if (data.availableTables && data.availableTables.length > 0) {
          setAvailableTables(data.availableTables);
          setShowAvailableTables(true);
          
          // Create a message with table information
          const tableInfo = data.availableTables.map((t: Table) => 
            `Table ${t.number} (${t.location || ''}, seats ${t.capacity})`
          ).join('\n');
          
          alert(`Reservation created successfully!\n\nAvailable tables for your party size:\n${tableInfo}`);
        } else if (tablesEnabled && data.tableAssigned) {
          // Just show assigned table
          alert(`Reservation created successfully!\nAssigned to Table ${data.tableNumber}`);
        }
      } else {
        setFormError(data.message || 'Failed to save reservation');
      }
    } catch (err) {
      console.error('Error saving reservation:', err);
      setFormError('Error saving reservation');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      numberOfPersons: '',
      time: '',
      reservationDate: '',
      status: 'pending',
      tableId: null,
      reassignTable: false
    });
    setIsEditing(false);
    setFormError(null);
  };

  const handleCancel = () => {
    resetForm();
    setShowForm(false);
  };

  // Get table details for a reservation
  const getTableInfo = (reservation: Reservation) => {
    try {
      if (!tablesEnabled) return 'N/A';
      
      if (!reservation.tableId || !reservation.table) {
        return 'Not assigned';
      }
      return `Table ${reservation.table.number} (${reservation.table.location || ''}, seats ${reservation.table.capacity})`;
    } catch (error) {
      return 'Not assigned';
    }
  };

  // Refresh tables and reservations
  const refreshData = async () => {
    await fetchTables();
    await fetchReservations();
  };

  // Ensure table column is always visible
  useEffect(() => {
    if (initialSetupDone) {
      // Update table assignment display if any reservations have tables
      const hasTableAssignments = reservations.some(r => r.tableId !== null && r.tableId !== undefined);
      if (hasTableAssignments && !tablesEnabled) {
        setTablesEnabled(true);
      }
    }
  }, [reservations, initialSetupDone]);

  return (
    <div className="w-full overflow-hidden rounded-lg shadow bg-white">
      <div className="flex justify-between items-center p-4 bg-gray-50 border-b">
        <h2 className="text-2xl font-semibold">Reservation Table</h2>
        <div className="flex items-center space-x-4">
          <span className="text-xs text-gray-500">
            Last updated: {lastRefresh.toLocaleTimeString()}
          </span>
          <button 
            onClick={refreshData}
            className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
          >
            Refresh Now
          </button>
          <button 
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600"
          >
            Add New
          </button>
          <button 
            onClick={forceCreateTables}
            className="px-3 py-1 bg-purple-500 text-white text-sm rounded hover:bg-purple-600"
          >
            Create Tables
          </button>
        </div>
      </div>
      
      {/* Available Tables Information */}
      {showAvailableTables && availableTables.length > 0 && (
        <div className="p-4 border-b bg-blue-50">
          <h3 className="text-lg font-semibold mb-2">Available Tables</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {availableTables.map(table => (
              <div key={table.id} className="border rounded p-2 bg-white">
                <div className="font-medium">Table {table.number}</div>
                <div className="text-sm text-gray-600">Location: {table.location || 'Main area'}</div>
                <div className="text-sm text-gray-600">Seats: {table.capacity}</div>
              </div>
            ))}
          </div>
          <button 
            onClick={() => setShowAvailableTables(false)}
            className="mt-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
          >
            Hide
          </button>
        </div>
      )}
      
      {/* Reservation Form */}
      {showForm && (
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold mb-4">{isEditing ? 'Edit Reservation' : 'Add New Reservation'}</h3>
          {formError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
              {formError}
            </div>
          )}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
                placeholder="Full Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
                placeholder="Phone Number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Number of Persons</label>
              <input
                type="number"
                name="numberOfPersons"
                value={formData.numberOfPersons}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
                min="1"
                placeholder="Number of Persons"
              />
              {tablesEnabled && formData.numberOfPersons && (
                <button 
                  type="button"
                  onClick={() => checkAvailableTables(
                    parseInt(formData.numberOfPersons.toString()), 
                    formData.reservationDate, 
                    formData.time
                  )}
                  className="mt-1 text-xs text-blue-600 hover:text-blue-800"
                >
                  Check available tables
                </button>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Time</label>
              <input
                type="text"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
                placeholder="e.g. 7:30 PM"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <input
                type="text"
                name="reservationDate"
                value={formData.reservationDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
                placeholder="e.g. 2025-04-19"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            {tablesEnabled && (
              <div>
                <label className="block text-sm font-medium mb-1">Table Assignment</label>
                <div className="flex items-center space-x-2">
                  <select
                    name="tableId"
                    value={formData.tableId || ''}
                    onChange={handleTableChange}
                    className="w-full px-3 py-2 border rounded"
                  >
                    <option value="">Auto-assign table</option>
                    {getAvailableTables().map(table => (
                      <option key={table.id} value={table.id}>
                        Table {table.number} ({table.location}, seats {table.capacity})
                      </option>
                    ))}
                  </select>
                  {isEditing && (
                    <button 
                      type="button"
                      onClick={handleReassignTable}
                      className="px-2 py-2 text-sm bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
                    >
                      Reassign
                    </button>
                  )}
                </div>
                {formData.reassignTable && (
                  <p className="text-sm text-blue-600 mt-1">
                    Table will be automatically assigned when you save
                  </p>
                )}
              </div>
            )}
            <div className="md:col-span-2 flex justify-end space-x-2 mt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                {isEditing ? 'Update' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Reservations Table */}
      <div className="p-4">
        {loading ? (
          <div className="text-center py-4">
            <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-blue-500 border-r-transparent"></div>
            <p className="mt-2 text-gray-500">Loading reservations...</p>
          </div>
        ) : error ? (
          <div className="text-center p-4 text-red-500">{error}</div>
        ) : reservations.length === 0 ? (
          <p className="text-center py-4 text-gray-500">No reservations found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Persons</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  {tablesEnabled && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Table</th>
                  )}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reservations.map((reservation) => (
                  <tr key={reservation.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{reservation.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{reservation.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{reservation.numberOfPersons}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{reservation.time}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{reservation.reservationDate}</td>
                    {tablesEnabled && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {getTableInfo(reservation)}
                      </td>
                    )}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${reservation.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                        reservation.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'}`}>
                        {reservation.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleEdit(reservation)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(reservation.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
} 