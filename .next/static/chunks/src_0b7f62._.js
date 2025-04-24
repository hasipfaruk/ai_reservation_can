(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/src_0b7f62._.js", {

"[project]/src/lib/utils.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "cn": (()=>cn)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/ui/button.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "Button": (()=>Button),
    "buttonVariants": (()=>buttonVariants)
});
(()=>{
    const e = new Error("Cannot find module 'react/jsx-dev-runtime'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
            destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
            outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
            secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            link: "text-primary underline-offset-4 hover:underline"
        },
        size: {
            default: "h-9 px-4 py-2",
            sm: "h-8 rounded-md px-3 text-xs",
            lg: "h-10 rounded-md px-8",
            icon: "h-9 w-9"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
const Button = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.forwardRef(_c = ({ className, variant, size, asChild = false, ...props }, ref)=>{
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slot"] : "button";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ref: ref,
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/button.tsx",
        lineNumber: 47,
        columnNumber: 7
    }, this);
});
_c1 = Button;
Button.displayName = "Button";
;
var _c, _c1;
__turbopack_refresh__.register(_c, "Button$React.forwardRef");
__turbopack_refresh__.register(_c1, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/ui/card.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "Card": (()=>Card),
    "CardContent": (()=>CardContent),
    "CardDescription": (()=>CardDescription),
    "CardFooter": (()=>CardFooter),
    "CardHeader": (()=>CardHeader),
    "CardTitle": (()=>CardTitle)
});
(()=>{
    const e = new Error("Cannot find module 'react/jsx-dev-runtime'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
;
;
const Card = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.forwardRef(_c = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("rounded-xl border bg-card text-card-foreground shadow", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 9,
        columnNumber: 3
    }, this));
_c1 = Card;
Card.displayName = "Card";
const CardHeader = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.forwardRef(_c2 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col space-y-1.5 p-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 24,
        columnNumber: 3
    }, this));
_c3 = CardHeader;
CardHeader.displayName = "CardHeader";
const CardTitle = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.forwardRef(_c4 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("font-semibold leading-none tracking-tight", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 36,
        columnNumber: 3
    }, this));
_c5 = CardTitle;
CardTitle.displayName = "CardTitle";
const CardDescription = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.forwardRef(_c6 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-sm text-muted-foreground", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 48,
        columnNumber: 3
    }, this));
_c7 = CardDescription;
CardDescription.displayName = "CardDescription";
const CardContent = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.forwardRef(_c8 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("p-6 pt-0", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 60,
        columnNumber: 3
    }, this));
_c9 = CardContent;
CardContent.displayName = "CardContent";
const CardFooter = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.forwardRef(_c10 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center p-6 pt-0", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 68,
        columnNumber: 3
    }, this));
_c11 = CardFooter;
CardFooter.displayName = "CardFooter";
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11;
__turbopack_refresh__.register(_c, "Card$React.forwardRef");
__turbopack_refresh__.register(_c1, "Card");
__turbopack_refresh__.register(_c2, "CardHeader$React.forwardRef");
__turbopack_refresh__.register(_c3, "CardHeader");
__turbopack_refresh__.register(_c4, "CardTitle$React.forwardRef");
__turbopack_refresh__.register(_c5, "CardTitle");
__turbopack_refresh__.register(_c6, "CardDescription$React.forwardRef");
__turbopack_refresh__.register(_c7, "CardDescription");
__turbopack_refresh__.register(_c8, "CardContent$React.forwardRef");
__turbopack_refresh__.register(_c9, "CardContent");
__turbopack_refresh__.register(_c10, "CardFooter$React.forwardRef");
__turbopack_refresh__.register(_c11, "CardFooter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/ReservationTable.tsx [app-client] (ecmascript)": (() => {{

throw new Error("An error occurred while generating the chunk item [project]/src/components/ReservationTable.tsx [app-client] (ecmascript)\n\nCaused by:\n- Cell doesn't exist\n\nDebug info:\n- An error occurred while generating the chunk item [project]/src/components/ReservationTable.tsx [app-client] (ecmascript)\n- Execution of *EcmascriptChunkItemContent::module_factory failed\n- Execution of *EcmascriptChunkItemContent::new failed\n- Execution of EcmascriptModuleContent::new failed\n- Execution of <EsmAssetReference as CodeGenerateable>::code_generation failed\n- Execution of *ReferencedAsset::from_resolve_result failed\n- Execution of esm_resolve failed\n- Execution of *apply_esm_specific_options failed\n- Execution of resolve_options failed\n- Cell doesn't exist");

}}),
"[project]/src/components/VoiceComponent.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '@11labs/react'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
// UI
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ReservationTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/ReservationTable.tsx [app-client] (ecmascript)");
// ElevenLabs
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$11labs$2f$react$2f$dist$2f$lib$2e$modern$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@11labs/react/dist/lib.modern.js [app-client] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module 'node:process'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '@/components/ui/card'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module 'lucide-react'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__VolumeX$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/volume-x.js [app-client] (ecmascript) <export default as VolumeX>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/mic.js [app-client] (ecmascript) <export default as Mic>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MicOff$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/mic-off.js [app-client] (ecmascript) <export default as MicOff>");
;
var _s = __turbopack_refresh__.signature();
"use client";
;
;
;
;
;
;
const VoiceChat = ()=>{
    _s();
    const [hasPermission, setHasPermission] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isMuted, setIsMuted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [errorMessage, setErrorMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [pendingReservation, setPendingReservation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [conversationContext, setConversationContext] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [conversationHistory, setConversationHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [reservationSuccess, setReservationSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const fullConversationText = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])("");
    const completeConversationRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    // When conversation ends, this will be triggered to save the data
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "VoiceChat.useEffect": ()=>{
            // Only run this effect when conversation is marked as complete
            if (completeConversationRef.current && conversationHistory.length > 0) {
                console.log("Conversation marked complete, saving final data");
                // Submit one final request to save the data
                const finalConversationText = conversationHistory.map({
                    "VoiceChat.useEffect.finalConversationText": (msg)=>`${msg.source}: ${msg.message}`
                }["VoiceChat.useEffect.finalConversationText"]).join("\n");
                fetch('/api/reservation', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        message: "FINAL_SAVE",
                        conversationContext: finalConversationText
                    })
                }).then({
                    "VoiceChat.useEffect": (response)=>response.json()
                }["VoiceChat.useEffect"]).then({
                    "VoiceChat.useEffect": (data)=>{
                        if (data.success && data.reservation) {
                            console.log("Successfully saved final reservation:", data.reservation);
                            // Force an immediate refresh of the reservation table
                            forceDataRefresh();
                            setReservationSuccess(true);
                        }
                    }
                }["VoiceChat.useEffect"]).catch({
                    "VoiceChat.useEffect": (err)=>console.error("Error saving final data:", err)
                }["VoiceChat.useEffect"]);
                // Reset the complete flag
                completeConversationRef.current = false;
            }
        }
    }["VoiceChat.useEffect"], [
        completeConversationRef.current,
        conversationHistory.length
    ]);
    // Function to force data refresh
    const forceDataRefresh = ()=>{
        console.log("Forcing data refresh");
        setTimeout(()=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ReservationTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["refreshReservations"])();
            // Try a second refresh after 2 seconds to ensure data is updated
            setTimeout(()=>{
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ReservationTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["refreshReservations"])();
            }, 2000);
        }, 500);
    };
    // Update the full conversation text whenever history changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "VoiceChat.useEffect": ()=>{
            if (conversationHistory.length > 0) {
                fullConversationText.current = conversationHistory.map({
                    "VoiceChat.useEffect": (msg)=>`${msg.source}: ${msg.message}`
                }["VoiceChat.useEffect"]).join("\n");
                console.log("Full conversation updated:", fullConversationText.current);
            }
        }
    }["VoiceChat.useEffect"], [
        conversationHistory
    ]);
    // Update the conversation type to include the send method
    const conversation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$11labs$2f$react$2f$dist$2f$lib$2e$modern$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useConversation"])({
        onConnect: {
            "VoiceChat.useConversation[conversation]": ()=>{
                console.log("Connected to ElevenLabs");
            }
        }["VoiceChat.useConversation[conversation]"],
        onDisconnect: {
            "VoiceChat.useConversation[conversation]": ()=>{
                console.log("Disconnected from ElevenLabs");
                // Mark conversation as complete to trigger the final save effect
                if (conversationHistory.length > 0) {
                    completeConversationRef.current = true;
                    // Trigger the effect manually since we're in a callback
                    if (completeConversationRef.current && conversationHistory.length > 0) {
                        console.log("Conversation disconnected, saving final data");
                        // Submit one final request to save the data
                        const finalConversationText = conversationHistory.map({
                            "VoiceChat.useConversation[conversation].finalConversationText": (msg)=>`${msg.source}: ${msg.message}`
                        }["VoiceChat.useConversation[conversation].finalConversationText"]).join("\n");
                        fetch('/api/reservation', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                message: "FINAL_SAVE",
                                conversationContext: finalConversationText
                            })
                        }).then({
                            "VoiceChat.useConversation[conversation]": (response)=>response.json()
                        }["VoiceChat.useConversation[conversation]"]).then({
                            "VoiceChat.useConversation[conversation]": (data)=>{
                                if (data.success && data.reservation) {
                                    console.log("Successfully saved final reservation:", data.reservation);
                                    // Force an immediate refresh of the reservation table
                                    forceDataRefresh();
                                    setReservationSuccess(true);
                                } else {
                                    console.log("No reservation found in final save");
                                }
                            }
                        }["VoiceChat.useConversation[conversation]"]).catch({
                            "VoiceChat.useConversation[conversation]": (err)=>console.error("Error saving final data:", err)
                        }["VoiceChat.useConversation[conversation]"]);
                    }
                }
                // Reset state when conversation ends
                setPendingReservation(null);
                setConversationContext("");
                setConversationHistory([]);
                fullConversationText.current = "";
                // Force a final refresh when conversation ends
                if (reservationSuccess) {
                    forceDataRefresh();
                    setReservationSuccess(false);
                }
            }
        }["VoiceChat.useConversation[conversation]"],
        onMessage: {
            "VoiceChat.useConversation[conversation]": async (message)=>{
                console.log("Received message:", message);
                // Add message to conversation history
                const newMessage = {
                    source: message.source,
                    message: message.message
                };
                setConversationHistory({
                    "VoiceChat.useConversation[conversation]": (prev)=>{
                        const updated = [
                            ...prev,
                            newMessage
                        ];
                        return updated;
                    }
                }["VoiceChat.useConversation[conversation]"]);
                try {
                    // Check if this is a confirmation response
                    if (pendingReservation && conversationContext === "awaiting_confirmation") {
                        const userMessage = message.message.toLowerCase();
                        // Look for confirmation in the message
                        if (userMessage.includes("yes") || userMessage.includes("confirm") || userMessage.includes("correct") || userMessage.includes("that's right")) {
                            // Send confirmation to the API
                            const confirmResponse = await fetch('/api/reservation', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    isConfirmation: true,
                                    reservationId: pendingReservation.id
                                })
                            });
                            const confirmData = await confirmResponse.json();
                            if (confirmData.success) {
                                console.log('Reservation confirmed:', confirmData.reservation);
                                // Reset the pending reservation now that it's confirmed
                                setPendingReservation(null);
                                setConversationContext("");
                                setReservationSuccess(true);
                                // Trigger an immediate refresh of the reservation table
                                forceDataRefresh();
                                // Respond to the user
                                conversation.send({
                                    message: "Great! Your reservation has been confirmed. We look forward to seeing you!"
                                });
                            }
                            return;
                        } else if (userMessage.includes("no") || userMessage.includes("cancel") || userMessage.includes("incorrect") || userMessage.includes("wrong")) {
                            // Handle rejection/cancellation
                            setPendingReservation(null);
                            setConversationContext("");
                            // Respond to the user
                            conversation.send({
                                message: "I understand. Let's start over with the reservation. Please provide your details again."
                            });
                            return;
                        }
                    }
                    // Only process for reservation data if it's a user message
                    if (message.source === 'user') {
                        // Send the entire conversation history for context
                        console.log("Sending full conversation for analysis:", fullConversationText.current);
                        // Regular message processing for new reservations
                        const response = await fetch('/api/reservation', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                message: message.message,
                                conversationContext: fullConversationText.current
                            })
                        });
                        const data = await response.json();
                        if (data.success && data.reservation) {
                            console.log('Reservation stored successfully:', data.reservation);
                            // Set the pending reservation
                            setPendingReservation(data.reservation);
                            setConversationContext("awaiting_confirmation");
                            setReservationSuccess(true);
                            // Trigger immediate refresh of the reservation table to show pending reservation
                            forceDataRefresh();
                            // Ask for confirmation
                            if (data.message) {
                                conversation.send({
                                    message: data.message + "\n\nIs this information correct? Please say 'yes' to confirm or 'no' to start over."
                                });
                            }
                        } else {
                            console.log('No reservation data found in message');
                        }
                    }
                } catch (error) {
                    console.error("Error processing message:", error);
                }
            }
        }["VoiceChat.useConversation[conversation]"],
        onError: {
            "VoiceChat.useConversation[conversation]": (error)=>{
                setErrorMessage(typeof error === "string" ? error : error.message);
                console.error("Error:", error);
            }
        }["VoiceChat.useConversation[conversation]"]
    });
    const { status, isSpeaking } = conversation;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "VoiceChat.useEffect": ()=>{
            // Request microphone permission on component mount
            const requestMicPermission = {
                "VoiceChat.useEffect.requestMicPermission": async ()=>{
                    try {
                        await navigator.mediaDevices.getUserMedia({
                            audio: true
                        });
                        setHasPermission(true);
                    } catch (error) {
                        setErrorMessage("Microphone access denied");
                        console.error("Error accessing microphone:", error);
                    }
                }
            }["VoiceChat.useEffect.requestMicPermission"];
            requestMicPermission();
            // When component mounts, refresh the data once
            forceDataRefresh();
        }
    }["VoiceChat.useEffect"], []);
    const handleStartConversation = async ()=>{
        try {
            // Reset the conversation history when starting a new conversation
            setConversationHistory([]);
            fullConversationText.current = "";
            // Replace with your actual agent ID or URL
            const conversationId = await conversation.startSession({
                agentId: ("TURBOPACK compile-time value", "1vOGLn6DvkeKqKL35oYZ")
            });
            console.log("Started conversation:", conversationId);
        } catch (error) {
            setErrorMessage("Failed to start conversation");
            console.error("Error starting conversation:", error);
        }
    };
    const handleEndConversation = async ()=>{
        try {
            // Before ending the conversation, do a final check for reservation data
            if (conversationHistory.length > 0 && !pendingReservation && !reservationSuccess) {
                // Try one last time to find reservation data
                console.log("Final check for reservation data before ending conversation");
                await checkForReservationData();
            }
            await conversation.endSession();
            // Reset state when conversation ends
            setPendingReservation(null);
            setConversationContext("");
            setConversationHistory([]);
            fullConversationText.current = "";
            // Force a final refresh
            if (reservationSuccess) {
                forceDataRefresh();
                setReservationSuccess(false);
            }
        } catch (error) {
            setErrorMessage("Failed to end conversation");
            console.error("Error ending conversation:", error);
        }
    };
    // Function to check for reservation data in the conversation
    const checkForReservationData = async ()=>{
        if (conversationHistory.length > 0) {
            console.log("Checking conversation for reservation data");
            try {
                const response = await fetch('/api/reservation', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        message: "MANUAL_CHECK",
                        conversationContext: fullConversationText.current
                    })
                });
                const data = await response.json();
                if (data.success && data.reservation) {
                    setPendingReservation(data.reservation);
                    setConversationContext("awaiting_confirmation");
                    setReservationSuccess(true);
                    forceDataRefresh();
                    conversation.send({
                        message: data.message + "\n\nIs this information correct? Please say 'yes' to confirm or 'no' to start over."
                    });
                    return true;
                } else {
                    console.log('No reservation data found in conversation');
                    return false;
                }
            } catch (err) {
                console.error("Error checking reservation data:", err);
                return false;
            }
        }
        return false;
    };
    const handleManualDataCheck = ()=>{
        // Use the shared function
        checkForReservationData();
    };
    const toggleMute = async ()=>{
        try {
            await conversation.setVolume({
                volume: isMuted ? 1 : 0
            });
            setIsMuted(!isMuted);
        } catch (error) {
            setErrorMessage("Failed to change volume");
            console.error("Error changing volume:", error);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
        className: "w-full max-w-md mx-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CardTitle, {
                    className: "flex items-center justify-between",
                    children: [
                        "Voice Chat",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-2",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "outline",
                                size: "icon",
                                onClick: toggleMute,
                                disabled: status !== "connected",
                                children: isMuted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__VolumeX$3e$__["VolumeX"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/VoiceComponent.tsx",
                                    lineNumber: 408,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Volume2, {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/VoiceComponent.tsx",
                                    lineNumber: 410,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/VoiceComponent.tsx",
                                lineNumber: 401,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/VoiceComponent.tsx",
                            lineNumber: 400,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/VoiceComponent.tsx",
                    lineNumber: 398,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/VoiceComponent.tsx",
                lineNumber: 397,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-center",
                            children: status === "connected" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-full flex flex-col gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "destructive",
                                        onClick: handleEndConversation,
                                        className: "w-full",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MicOff$3e$__["MicOff"], {
                                                className: "mr-2 h-4 w-4"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/VoiceComponent.tsx",
                                                lineNumber: 426,
                                                columnNumber: 19
                                            }, this),
                                            "End Conversation"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/VoiceComponent.tsx",
                                        lineNumber: 421,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "outline",
                                        onClick: handleManualDataCheck,
                                        className: "w-full text-sm",
                                        children: "Check Conversation for Reservation"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/VoiceComponent.tsx",
                                        lineNumber: 429,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/VoiceComponent.tsx",
                                lineNumber: 420,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                onClick: handleStartConversation,
                                disabled: !hasPermission,
                                className: "w-full",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__["Mic"], {
                                        className: "mr-2 h-4 w-4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/VoiceComponent.tsx",
                                        lineNumber: 443,
                                        columnNumber: 17
                                    }, this),
                                    "Start Conversation"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/VoiceComponent.tsx",
                                lineNumber: 438,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/VoiceComponent.tsx",
                            lineNumber: 418,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center text-sm",
                            children: [
                                status === "connected" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-green-600",
                                    children: isSpeaking ? "Agent is speaking..." : pendingReservation && conversationContext === "awaiting_confirmation" ? "Awaiting confirmation..." : "Listening..."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/VoiceComponent.tsx",
                                    lineNumber: 451,
                                    columnNumber: 15
                                }, this),
                                reservationSuccess && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-blue-600 mt-2",
                                    children: 'Reservation data updated. Click "Refresh Now" in the table below to view.'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/VoiceComponent.tsx",
                                    lineNumber: 460,
                                    columnNumber: 15
                                }, this),
                                errorMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-red-500",
                                    children: errorMessage
                                }, void 0, false, {
                                    fileName: "[project]/src/components/VoiceComponent.tsx",
                                    lineNumber: 464,
                                    columnNumber: 30
                                }, this),
                                !hasPermission && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-yellow-600",
                                    children: "Please allow microphone access to use voice chat"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/VoiceComponent.tsx",
                                    lineNumber: 466,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/VoiceComponent.tsx",
                            lineNumber: 449,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/VoiceComponent.tsx",
                    lineNumber: 417,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/VoiceComponent.tsx",
                lineNumber: 416,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/VoiceComponent.tsx",
        lineNumber: 396,
        columnNumber: 5
    }, this);
};
_s(VoiceChat, "C0y+bm+gm2ryxMddtsYtPbXH3ds=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$11labs$2f$react$2f$dist$2f$lib$2e$modern$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useConversation"]
    ];
});
_c = VoiceChat;
const __TURBOPACK__default__export__ = VoiceChat;
var _c;
__turbopack_refresh__.register(_c, "VoiceChat");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/page.tsx [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: require } = __turbopack_context__;
{
}}),
}]);

//# sourceMappingURL=src_0b7f62._.js.map