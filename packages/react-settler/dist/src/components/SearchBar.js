"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchBar = SearchBar;
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * SearchBar Component
 * Search functionality for reconciliation data
 */
const react_1 = require("react");
const context_1 = require("../context");
const useTelemetry_1 = require("../hooks/useTelemetry");
function SearchBar({ onSearch, placeholder = 'Search transactions...', className, debounceMs = 300, searchFields = ['id', 'providerTransactionId', 'referenceId'] }) {
    const context = (0, context_1.useCompilationContext)();
    const { track } = (0, useTelemetry_1.useTelemetry)('SearchBar');
    const [query, setQuery] = (0, react_1.useState)('');
    const [debouncedQuery, setDebouncedQuery] = (0, react_1.useState)('');
    // Debounce search
    (0, react_1.useEffect)(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query);
        }, debounceMs);
        return () => clearTimeout(timer);
    }, [query, debounceMs]);
    (0, react_1.useEffect)(() => {
        if (debouncedQuery !== query) {
            track('search.executed', { query: debouncedQuery, length: debouncedQuery.length });
            onSearch?.(debouncedQuery);
        }
    }, [debouncedQuery, onSearch, track]);
    const handleChange = (0, react_1.useCallback)((e) => {
        const value = e.target.value;
        setQuery(value);
        track('search.changed', { query: value });
    }, [track]);
    const handleClear = (0, react_1.useCallback)(() => {
        setQuery('');
        setDebouncedQuery('');
        track('search.cleared');
        onSearch?.('');
    }, [onSearch, track]);
    // In config mode, register widget
    if (context.mode === 'config') {
        if (!context.config.widgets) {
            context.config.widgets = {};
        }
        context.config.widgets['search-bar'] = {
            id: 'search-bar',
            type: 'filter-bar', // Reuse filter-bar type
            props: {
                placeholder,
                debounceMs,
                searchFields
            }
        };
        return null;
    }
    // UI mode
    return ((0, jsx_runtime_1.jsxs)("div", { className: className, "data-widget": "search-bar", style: { position: 'relative' }, children: [(0, jsx_runtime_1.jsx)("input", { type: "text", value: query, onChange: handleChange, placeholder: placeholder, style: {
                    width: '100%',
                    padding: '0.75rem 2.5rem 0.75rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid #d1d5db',
                    fontSize: '1rem'
                } }), query && ((0, jsx_runtime_1.jsx)("button", { onClick: handleClear, style: {
                    position: 'absolute',
                    right: '0.5rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1.25rem',
                    color: '#6b7280'
                }, "aria-label": "Clear search", children: "\u00D7" }))] }));
}
//# sourceMappingURL=SearchBar.js.map