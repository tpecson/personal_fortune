import React, { useEffect, useState } from 'react';
import { Compass } from 'lucide-react';
import { getAstrologicalChart } from '../services/fortuneService';
import * as Dialog from '@radix-ui/react-dialog';

export default function AstroWidget({ birthDate, birthTime, birthPlace }: {
  birthDate: string;
  birthTime: string;
  birthPlace: string;
}) {
  const [chartData, setChartData] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchChart = async () => {
      const data = await getAstrologicalChart();
      setChartData(data);
    };
    
    fetchChart();
    // Update chart every minute
    const interval = setInterval(fetchChart, 60000);
    
    return () => clearInterval(interval);
  }, []);

  if (!chartData) return <div>Loading...</div>;

  const renderNatalChart = () => (
    <svg viewBox="0 0 400 400" className="w-full h-full">
      {/* Outer circle */}
      <circle cx="200" cy="200" r="180" fill="none" stroke="black" strokeWidth="2"/>
      
      {/* House divisions */}
      {chartData.houses.map((house: any, i: number) => {
        const angle = (house.position - 90) * Math.PI / 180;
        const x2 = 200 + 180 * Math.cos(angle);
        const y2 = 200 + 180 * Math.sin(angle);
        return (
          <g key={i}>
            <line 
              x1="200" 
              y1="200" 
              x2={x2} 
              y2={y2} 
              stroke="black" 
              strokeWidth="1"
            />
            <text
              x={200 + 190 * Math.cos(angle)}
              y={200 + 190 * Math.sin(angle)}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-xs"
            >
              {house.number}
            </text>
          </g>
        );
      })}
      
      {/* Planet symbols */}
      {chartData.planets?.map((planet: any, i: number) => {
        const angle = ((planet.position - 90) * Math.PI) / 180;
        const r = 150; // Radius for planet placement
        const x = 200 + r * Math.cos(angle);
        const y = 200 + r * Math.sin(angle);
        return (
          <g key={i}>
            <text
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-base"
            >
              {planet.symbol}
            </text>
            <text
              x={x}
              y={y + 15}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-xs"
            >
              {planet.degree}°
            </text>
          </g>
        );
      })}
    </svg>
  );

  return (
    <div className="p-4">
      <div className="text-center mb-4">
        <p className="text-sm text-gray-600">Current Time: {chartData.currentTime}</p>
        <p className="text-sm text-gray-600">Date: {chartData.currentDate}</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center p-3 bg-purple-50 rounded-lg">
          <h4 className="font-medium">Sun Sign</h4>
          <p>{chartData.sunSign}</p>
        </div>
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <h4 className="font-medium">Moon Sign</h4>
          <p>{chartData.moonSign}</p>
        </div>
        <div className="text-center p-3 bg-indigo-50 rounded-lg">
          <h4 className="font-medium">Ascendant</h4>
          <p>{chartData.ascendant}</p>
        </div>
      </div>

      <div className="mt-4">
        <div className="w-full aspect-square">
          {renderNatalChart()}
        </div>
        
        <Dialog.Root open={modalOpen} onOpenChange={setModalOpen}>
          <Dialog.Trigger asChild>
            <button className="mt-4 w-full py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
              View Full Chart Details
            </button>
          </Dialog.Trigger>
          
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/50" />
            <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-[90vw] max-w-2xl max-h-[85vh] overflow-y-auto">
              <Dialog.Title className="text-xl font-bold mb-4">Current Astrological Chart</Dialog.Title>
              
              <div className="aspect-square w-full mb-4">
                {renderNatalChart()}
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium">Interpretation</h3>
                <p className="text-sm text-gray-600">{chartData.interpretation}</p>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Planetary Positions</h3>
                  {chartData.planets?.map((planet: any, i: number) => (
                    <div key={i} className="text-sm">
                      <span className="font-medium">{planet.name}:</span> {planet.sign} {planet.degree}°
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Current Aspects</h3>
                  {chartData.aspects?.map((aspect: any, i: number) => (
                    <div key={i} className="text-sm">
                      <span className="font-medium">{aspect.planet1} - {aspect.planet2}:</span> {aspect.type} ({aspect.angle}°)
                    </div>
                  ))}
                </div>
              </div>
              
              <Dialog.Close asChild>
                <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                  ✕
                </button>
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </div>
  );
}