// src/components/ChainStats.tsx
import React, { useEffect, useState } from 'react';
import { fetchChainInfo, ChainInfo } from '../api/chainApi';

export const ChainStats: React.FC = () => {
    const [chainInfo, setChainInfo] = useState<ChainInfo | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const info = await fetchChainInfo();
                setChainInfo(info);
            } catch (e) {
                setError(e instanceof Error ? e.message : 'Failed to fetch chain info');
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 5000); // Poll every 5 seconds
        return () => clearInterval(interval);
    }, []);

    if (error) return <div className="error">Error: {error}</div>;
    if (!chainInfo) return <div>Loading...</div>;

    return (
        <div className="chain-stats">
            <h2>Sharechain Info</h2>
            <div className="stat-grid">
                <div className="stat-item">
                    <label>Network</label>
                    <span>{chainInfo.network}</span>
                </div>
                <div className="stat-item">
                    <label>Chain Tip</label>
                    <span className="mono">{chainInfo.tip.substring(0, 16)}...</span>
                </div>
                <div className="stat-item">
                    <label>Height</label>
                    <span>{chainInfo.height ?? 'N/A'}</span>
                </div>
                <div className="stat-item">
                    <label>Total Work</label>
                    <span className="mono">0x{chainInfo.total_work.substring(0, 12)}...</span>
                </div>
                <div className="stat-item">
                    <label>Uncles</label>
                    <span>{chainInfo.uncles.length}</span>
                </div>
            </div>
        </div>
    );
};
