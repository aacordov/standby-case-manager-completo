import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, AlertCircle, ArrowRight, Activity, RefreshCw } from 'lucide-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../api/axios';
import { clsx } from 'clsx';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Skeleton } from '../components/Skeleton';
import { StatsOverview } from '../components/StatsOverview';
import { Switch } from '@headlessui/react';
import { useToast } from '../context/ToastContext';
import { ConfirmationModal } from '../components/ui/ConfirmationModal';
import { DateRangeFilter } from '../components/ui/DateRangeFilter';

interface Case {
    id: number;
    codigo: string;
    estado: string;
    prioridad: string;
    servicio_o_plataforma: string;
    sby_responsable: string;
    novedades_y_comentarios: string;
    ultima_actualizacion: string;
}

export default function Dashboard() {
    const [filters, setFilters] = useState({
        status: '',
        priority: '',
        service: '',
        sby_responsable: '',
        search: '',
        start_date: '',
        end_date: ''
    });
    const [autoRefresh, setAutoRefresh] = useState(false);

    const { data: cases = [], isLoading, isError } = useQuery({
        queryKey: ['cases', filters],
        queryFn: async () => {
            const params = new URLSearchParams();
            if (filters.status) params.append('status', filters.status);
            if (filters.priority) params.append('priority', filters.priority);
            if (filters.service) params.append('service', filters.service);
            if (filters.sby_responsable) params.append('sby_responsable', filters.sby_responsable);
            if (filters.search) params.append('search', filters.search);
            if (filters.start_date) params.append('start_date', filters.start_date);
            if (filters.end_date) params.append('end_date', filters.end_date);

            // Send timezone offset in minutes
            const offset = new Date().getTimezoneOffset();
            params.append('timezone_offset', offset.toString());

            const res = await api.get(`/cases/?${params.toString()}`);
            return res.data as Case[];
        },
        staleTime: 60000, // 1 minute
        refetchInterval: autoRefresh ? 30000 : false, // 30s auto-refresh
    });

    const getStatusVariant = (status: string) => {
        switch (status) {
            case 'CRITICO': return 'danger';
            case 'ALTO': return 'warning';
            case 'CERRADO': return 'success';
            case 'STANDBY': return 'warning';
            case 'EN_MONITOREO': return 'info';
            default: return 'default';
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'CRITICO': return 'text-red-600 dark:text-red-500 font-bold';
            case 'ALTO': return 'text-orange-600 dark:text-orange-500 font-bold';
            case 'MEDIO': return 'text-yellow-600 dark:text-yellow-500 font-medium';
            case 'BAJO': return 'text-emerald-600 dark:text-emerald-500 font-medium';
            default: return 'text-slate-500 dark:text-slate-400';
        }
    };

    // Bulk Actions
    const queryClient = useQueryClient();
    const { showToast } = useToast();
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [confirmModal, setConfirmModal] = useState({
        isOpen: false,
        title: '',
        message: '',
        action: '' as 'CLOSE' | '',
        value: ''
    });

    const toggleSelection = (id: number) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    const toggleAll = () => {
        if (selectedIds.length === cases.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(cases.map(c => c.id));
        }
    };

    const handleBulkActionRequest = (action: 'CLOSE', value: string) => {
        setConfirmModal({
            isOpen: true,
            title: 'Confirmar Acción Masiva',
            message: `¿Estás seguro de que deseas cerrar ${selectedIds.length} casos?`,
            action,
            value
        });
    };

    const executeBulkAction = async () => {
        if (!confirmModal.action) return;

        try {
            await api.post('/cases/bulk-update', {
                ids: selectedIds,
                action: confirmModal.action,
                value: confirmModal.value
            });
            showToast('success', 'Actualización Masiva', `Se han actualizado ${selectedIds.length} casos correctamente.`);
            setSelectedIds([]);
            queryClient.invalidateQueries({ queryKey: ['cases'] });
            queryClient.invalidateQueries({ queryKey: ['stats'] });
        } catch (error: any) {
            showToast('error', 'Error', 'No se pudo completar la actualización masiva.');
        }
    };

    return (
        <div className="space-y-6 pb-20 relative">
            <StatsOverview autoRefresh={autoRefresh} />

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Tablero de Casos</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">Monitoreo y gestión de incidentes en tiempo real.</p>
                </div>
                
                <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
                        <Activity size={14} className="text-indigo-500" />
                        <span>{cases.length} casos encontrados</span>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Auto Refresh Toggle */}
                        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg h-9 px-3 flex items-center gap-2">
                            <RefreshCw size={14} className={clsx("text-slate-500", autoRefresh && "animate-spin text-indigo-500")} />
                            <Switch
                                checked={autoRefresh}
                                onChange={setAutoRefresh}
                                className={`${autoRefresh ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-700'
                                    } relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none`}
                            >
                                <span
                                    className={`${autoRefresh ? 'translate-x-5' : 'translate-x-1'
                                        } inline-block h-3 w-3 transform rounded-full bg-white transition-transform`}
                                />
                            </Switch>
                            <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Auto</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters Section */}
            <Card className="p-5 space-y-4 relative z-30 overflow-visible">
                <div className="flex items-center gap-2 text-slate-900 dark:text-white font-medium mb-2">
                    <Filter size={16} /> Filtros de Búsqueda
                </div>
                {/* Date Filters - Top Row */}
                <div className="flex flex-col gap-4 relative z-20">
                    <div className="flex flex-wrap items-center gap-4">
                        <DateRangeFilter
                            startDate={filters.start_date}
                            endDate={filters.end_date}
                            onStartDateChange={(date) => setFilters({ ...filters, start_date: date })}
                            onEndDateChange={(date) => setFilters({ ...filters, end_date: date })}
                        />

                        <select
                            value={filters.status}
                            onChange={e => setFilters({ ...filters, status: e.target.value })}
                            className="px-3 py-2 rounded-lg text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                        >
                            <option value="">Estado: Todos</option>
                            <option value="ABIERTO">Abierto</option>
                            <option value="STANDBY">Standby</option>
                            <option value="EN_MONITOREO">En Monitoreo</option>
                            <option value="CERRADO">Cerrado</option>
                        </select>

                        <select
                            value={filters.priority}
                            onChange={e => setFilters({ ...filters, priority: e.target.value })}
                            className="px-3 py-2 rounded-lg text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                        >
                            <option value="">Prioridad: Todas</option>
                            <option value="CRITICO">Crítico</option>
                            <option value="ALTO">Alto</option>
                            <option value="MEDIO">Medio</option>
                            <option value="BAJO">Bajo</option>
                        </select>

                        <Button
                            variant="outline"
                            onClick={() => setFilters({ status: '', priority: '', service: '', sby_responsable: '', search: '', start_date: '', end_date: '' })}
                            className="h-9 text-sm"
                        >
                            Limpiar
                        </Button>
                    </div>
                </div>

                {/* Search & Text Filters - Bottom Row */}
                <div className="flex flex-col md:flex-row gap-4 relative z-10">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <Input
                            type="text"
                            placeholder="Buscar por código o comentarios..."
                            className="pl-10 w-full"
                            value={filters.search}
                            onChange={e => setFilters({ ...filters, search: e.target.value })}
                        />
                    </div>

                    {/* Secondary Filters */}
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                        <Input
                            type="text"
                            placeholder="Servicio..."
                            className="w-40"
                            value={filters.service}
                            onChange={e => setFilters({ ...filters, service: e.target.value })}
                        />
                        <Input
                            type="text"
                            placeholder="Responsable..."
                            className="w-40"
                            value={filters.sby_responsable}
                            onChange={e => setFilters({ ...filters, sby_responsable: e.target.value })}
                        />
                    </div>
                </div>
            </Card>

            {/* Table */}
            <Card className="overflow-hidden relative z-0">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50 dark:bg-white/5 border-b border-slate-200 dark:border-white/10">
                            <tr>
                                <th className="p-4 w-4">
                                    <input
                                        type="checkbox"
                                        className="rounded border-slate-300 dark:border-slate-600"
                                        checked={cases.length > 0 && selectedIds.length === cases.length}
                                        onChange={toggleAll}
                                    />
                                </th>
                                <th className="p-4 font-semibold text-slate-600 dark:text-gray-300 text-sm">Código</th>
                                <th className="p-4 font-semibold text-slate-600 dark:text-gray-300 text-sm">Servicio</th>
                                <th className="p-4 font-semibold text-slate-600 dark:text-gray-300 text-sm">Estado</th>
                                <th className="p-4 font-semibold text-slate-600 dark:text-gray-300 text-sm">Prioridad</th>
                                <th className="p-4 font-semibold text-slate-600 dark:text-gray-300 text-sm">Motivo</th>
                                <th className="p-4 font-semibold text-slate-600 dark:text-gray-300 text-sm">Responsable</th>
                                <th className="p-4 font-semibold text-slate-600 dark:text-gray-300 text-sm">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-white/5">
                            {isLoading ? (
                                Array.from({ length: 5 }).map((_, i) => (
                                    <tr key={i}>
                                        <td className="p-4"><Skeleton className="h-4 w-4" /></td>
                                        <td className="p-4"><Skeleton className="h-4 w-20" /></td>
                                        <td className="p-4"><Skeleton className="h-4 w-32" /></td>
                                        <td className="p-4"><Skeleton className="h-6 w-24 rounded-full" /></td>
                                        <td className="p-4"><Skeleton className="h-4 w-16" /></td>
                                        <td className="p-4"><Skeleton className="h-4 w-48" /></td>
                                        <td className="p-4"><Skeleton className="h-4 w-24" /></td>
                                        <td className="p-4"><Skeleton className="h-4 w-12" /></td>
                                    </tr>
                                ))
                            ) : isError ? (
                                <tr>
                                    <td colSpan={8} className="p-8 text-center text-red-500">
                                        Error al cargar los casos. Por favor intente nuevamente.
                                    </td>
                                </tr>
                            ) : Array.isArray(cases) && cases.map((c) => (
                                <tr key={c.id} className={clsx("hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group", selectedIds.includes(c.id) ? "bg-indigo-50/50 dark:bg-indigo-900/20" : "")}>
                                    <td className="p-4">
                                        <input
                                            type="checkbox"
                                            className="rounded border-slate-300 dark:border-slate-600"
                                            checked={selectedIds.includes(c.id)}
                                            onChange={() => toggleSelection(c.id)}
                                        />
                                    </td>
                                    <td className="p-4 font-mono text-sm font-medium text-slate-900 dark:text-white">{c.codigo}</td>
                                    <td className="p-4 text-sm text-slate-600 dark:text-gray-300">{c.servicio_o_plataforma}</td>
                                    <td className="p-4">
                                        <Badge variant={getStatusVariant(c.estado) as any}>
                                            {c.estado}
                                        </Badge>
                                    </td>
                                    <td className="p-4">
                                        <span className={clsx("text-sm", getPriorityColor(c.prioridad))}>
                                            {c.prioridad}
                                        </span>
                                    </td>
                                    <td className="p-4 text-sm text-slate-500 dark:text-gray-400 max-w-xs truncate" title={c.novedades_y_comentarios}>
                                        {c.novedades_y_comentarios || '-'}
                                    </td>
                                    <td className="p-4 text-sm text-slate-500 dark:text-gray-400">{c.sby_responsable || '-'}</td>
                                    <td className="p-4">
                                        <Link
                                            to={`/cases/${c.id}`}
                                            className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors"
                                        >
                                            Ver <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            {!isLoading && !isError && (!cases || cases.length === 0) && (
                                <tr>
                                    <td colSpan={8} className="p-12 text-center">
                                        <div className="flex flex-col items-center justify-center text-gray-500">
                                            <AlertCircle size={43} className="mb-2 opacity-50" />
                                            <p className="text-lg font-medium text-gray-400">No se encontraron casos</p>
                                            <p className="text-sm">Intenta ajustar los filtros de búsqueda</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Bulk Actions Floating Bar */}
            {selectedIds.length > 0 && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3 rounded-full shadow-xl flex items-center gap-4 animate-in slide-in-from-bottom duration-300 z-50">
                    <span className="font-semibold text-sm">{selectedIds.length} seleccionados</span>
                    <div className="h-4 w-px bg-white/20 dark:bg-black/20" />
                    <button
                        onClick={() => handleBulkActionRequest('CLOSE', '')}
                        className="text-sm hover:text-indigo-400 dark:hover:text-indigo-600 transition-colors font-medium"
                    >
                        Cerrar Casos
                    </button>
                    <button
                        onClick={() => setSelectedIds([])}
                        className="ml-2 p-1 hover:bg-white/10 dark:hover:bg-black/10 rounded-full"
                    >
                        <span className="sr-only">Cancelar</span>
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                    </button>
                </div>
            )}

            <ConfirmationModal
                isOpen={confirmModal.isOpen}
                onClose={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
                onConfirm={executeBulkAction}
                title={confirmModal.title}
                message={confirmModal.message}
                confirmText="Confirmar"
                variant={confirmModal.action === 'CLOSE' ? 'danger' : 'warning'}
            />
        </div>
    );
}