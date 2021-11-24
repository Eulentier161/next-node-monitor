import { Error } from '@components';
import axios from 'axios';
import { ArcElement, Chart, Legend, Tooltip } from 'chart.js';
import React from 'react';
import { Pie } from 'react-chartjs-2';
import useSWR from 'swr';

interface Props {
    width: string;
    height: string;
}

export default function BlocksChart({ width, height }: Props) {
    const { data: swrData, error } = useSWR<APIResponse, Error>('/api', (url: string) =>
        axios.get<APIResponse>(url).then((res) => res.data)
    );

    if (error) {
        return <Error />;
    }

    Chart.register(ArcElement, Tooltip, Legend);

    if (!swrData) {
        return (
            <div>
                <Pie
                    data={{ labels: [], datasets: [] }}
                    width={width}
                    height={height}
                    options={{ maintainAspectRatio: false }}
                />
            </div>
        );
    }

    const cemented = swrData.cemented_blocks;
    const uncemented = swrData.current_block - swrData.cemented_blocks;
    const unchecked = swrData.unchecked_blocks;

    const data = {
        labels: ['cemented', 'uncemented', 'unchecked'],
        datasets: [
            {
                label: '# of Blocks',
                data: [cemented, uncemented, unchecked],
                backgroundColor: ['rgba(0, 255, 0, 1)', 'rgba(255, 255, 0, 1)', 'rgba(255, 0, 0, 1)'],
                borderColor: ['rgba(0, 255, 0, 0.2)', 'rgba(255, 255, 0, 0.2)', 'rgba(255, 0, 0, 0.2)'],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div>
            <Pie data={data} width={width} height={height} options={{ maintainAspectRatio: false }} />
        </div>
    );
}
