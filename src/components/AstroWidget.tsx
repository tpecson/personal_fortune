import React, { useEffect, useState } from 'react';
import { Compass } from 'lucide-react';
import { getAstrologicalChart } from '../services/astroService';
import * as Dialog from '@radix-ui/react-dialog';

interface HoveredElement {
  type: 'planet' | 'house' | 'zodiac';
  meaning: string;
}

export default function AstroWidget({ birthDate, birthTime, birthPlace }: {
  birthDate: string;
  birthTime: string;
  birthPlace: string;
}) {
  const [chartData, setChartData] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [hoveredElement, setHoveredElement] = useState<HoveredElement | null>(null);

  useEffect(() => {
    const fetchChart = async () => {
      const data = await getAstrologicalChart(birthDate, birthTime, birthPlace);
      setChartData(data);
    };
    
    fetchChart();
  }, [birthDate, birthTime, birthPlace]);

  if (!birthDate || !birthTime || !birthPlace) {
    return (
      <div className="flex items-center justify-center h-full text-halloween-text-primary">
        Please set your birth information in your profile to view your natal chart.
      </div>
    );
  }

  if (!chartData) return <div className="text-halloween-text-primary">Loading...</div>;

  const getZodiacName = (symbol: string) => {
    const zodiacMap: { [key: string]: string } = {
      '♈': 'Aries',
      '♉': 'Taurus',
      '♊': 'Gemini',
      '♋': 'Cancer',
      '♌': 'Leo',
      '♍': 'Virgo',
      '♎': 'Libra',
      '♏': 'Scorpio',
      '♐': 'Sagittarius',
      '♑': 'Capricorn',
      '♒': 'Aquarius',
      '♓': 'Pisces'
    };
    return zodiacMap[symbol] || '';
  };

  const renderNatalChart = () => (
    <div className="relative">
      <svg viewBox="0 0 400 400" className="w-full h-full">
        {/* Outer circle */}
        <circle cx="200" cy="200" r="180" fill="none" stroke="white" strokeWidth="2"/>
        
        {/* House divisions */}
        {chartData.houses.map((house: any, i: number) => {
          // Rotate 90 degrees clockwise to put section 1 at top
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
                stroke="white" 
                strokeWidth={i % 3 === 0 ? "2" : "1"}
                className="opacity-60"
              />
              <text
                x={200 + 170 * Math.cos(angle - Math.PI / 24)}
                y={200 + 170 * Math.sin(angle - Math.PI / 24)}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-sm font-medium cursor-help"
                fill="white"
                onMouseEnter={() => {
                  const sign = chartData.zodiacSigns.find((s: any) => s.symbol === house.sign);
                  setHoveredElement({ type: 'zodiac', meaning: sign.meaning });
                }}
                onMouseLeave={() => setHoveredElement(null)}
              >
                {house.sign}
              </text>
              <text
                x={200 + 190 * Math.cos(angle + Math.PI / 24)}
                y={200 + 190 * Math.sin(angle + Math.PI / 24)}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-xs cursor-help"
                fill="white"
                opacity="0.8"
                onMouseEnter={() => setHoveredElement({ 
                  type: 'house', 
                  meaning: house.meaning
                })}
                onMouseLeave={() => setHoveredElement(null)}
              >
                {`${house.number}, ${getZodiacName(house.sign)}`}
              </text>
            </g>
          );
        })}
        
        {/* Planet symbols */}
        {chartData.planets?.map((planet: any, i: number) => {
          // Rotate 90 degrees clockwise to match house divisions
          const angle = ((planet.position - 90) * Math.PI) / 180;
          const r = 150;
          const x = 200 + r * Math.cos(angle);
          const y = 200 + r * Math.sin(angle);
          return (
            <g key={i}>
              <text
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-base cursor-help"
                fill="white"
                onMouseEnter={() => setHoveredElement({
                  type: 'planet',
                  meaning: `${planet.name} - ${planet.meaning}`
                })}
                onMouseLeave={() => setHoveredElement(null)}
              >
                {planet.symbol}
              </text>
              <text
                x={x}
                y={y + 15}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-xs"
                fill="white"
                opacity="0.8"
              >
                {planet.degree}°
              </text>
            </g>
          );
        })}
      </svg>

      {/* Tooltip */}
      {hoveredElement && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-12 bg-halloween-card border border-halloween-border px-4 py-2 rounded-lg shadow-lg text-sm text-halloween-text-primary">
          {hoveredElement.meaning}
        </div>
      )}
    </div>
  );

  return (
    <div className="p-4">
      <div className="text-center mb-4">
        <p className="text-sm text-halloween-text-primary">Birth Date: {chartData.birthDate}</p>
        <p className="text-sm text-halloween-text-primary">Birth Time: {chartData.birthTime}</p>
        <p className="text-sm text-halloween-text-primary">Birth Place: {chartData.birthPlace}</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center p-3 bg-halloween-card/50 rounded-lg border border-halloween-border">
          <h4 className="font-medium text-halloween-text-secondary">Sun Sign</h4>
          <p className="text-halloween-text-primary">{chartData.sunSign}</p>
        </div>
        <div className="text-center p-3 bg-halloween-card/50 rounded-lg border border-halloween-border">
          <h4 className="font-medium text-halloween-text-secondary">Moon Sign</h4>
          <p className="text-halloween-text-primary">{chartData.moonSign}</p>
        </div>
        <div className="text-center p-3 bg-halloween-card/50 rounded-lg border border-halloween-border">
          <h4 className="font-medium text-halloween-text-secondary">Ascendant</h4>
          <p className="text-halloween-text-primary">{chartData.ascendant}</p>
        </div>
      </div>

      <div className="mt-4">
        <div className="w-full aspect-square">
          {renderNatalChart()}
        </div>
        
        <Dialog.Root open={modalOpen} onOpenChange={setModalOpen}>
          <Dialog.Trigger asChild>
            <button className="mt-6 w-full py-2 px-4 bg-halloween-accent text-white rounded-lg hover:bg-halloween-accent/90">
              View Full Chart Details
            </button>
          </Dialog.Trigger>
          
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/50" />
            <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-halloween-card rounded-lg p-6 w-[90vw] max-w-2xl max-h-[85vh] overflow-y-auto border border-halloween-border">
              <Dialog.Title className="text-xl font-bold mb-4 text-halloween-text-secondary">Your Natal Chart</Dialog.Title>
              
              <div className="aspect-square w-full mb-6">
                {renderNatalChart()}
              </div>
              
              <div className="space-y-6">
                <div className="bg-halloween-card/50 rounded-lg border border-halloween-border p-4">
                  <h3 className="text-lg font-medium text-halloween-text-secondary mb-3">Planet Positions</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-halloween-border">
                          <th className="text-left py-2 text-halloween-text-secondary">Planet</th>
                          <th className="text-left py-2 text-halloween-text-secondary">Sign</th>
                          <th className="text-left py-2 text-halloween-text-secondary">Degree</th>
                          <th className="text-left py-2 text-halloween-text-secondary">Meaning</th>
                        </tr>
                      </thead>
                      <tbody>
                        {chartData.planets.map((planet: any, i: number) => (
                          <tr key={i} className="border-b border-halloween-border/30">
                            <td className="py-2 text-halloween-text-primary">
                              <span className="mr-2">{planet.symbol}</span>
                              {planet.name}
                            </td>
                            <td className="py-2 text-halloween-text-primary">{planet.sign}</td>
                            <td className="py-2 text-halloween-text-primary">{planet.degree}°</td>
                            <td className="py-2 text-halloween-text-primary">{planet.meaning}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-halloween-card/50 rounded-lg border border-halloween-border p-4">
                  <h3 className="text-lg font-medium text-halloween-text-secondary mb-3">Houses</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-halloween-border">
                          <th className="text-left py-2 text-halloween-text-secondary">House</th>
                          <th className="text-left py-2 text-halloween-text-secondary">Sign</th>
                          <th className="text-left py-2 text-halloween-text-secondary">Meaning</th>
                        </tr>
                      </thead>
                      <tbody>
                        {chartData.houses.map((house: any, i: number) => (
                          <tr key={i} className="border-b border-halloween-border/30">
                            <td className="py-2 text-halloween-text-primary">{house.number}</td>
                            <td className="py-2 text-halloween-text-primary">{getZodiacName(house.sign)}</td>
                            <td className="py-2 text-halloween-text-primary">{house.meaning}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-halloween-card/50 rounded-lg border border-halloween-border p-4">
                  <h3 className="text-lg font-medium text-halloween-text-secondary mb-3">Major Aspects</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-halloween-border">
                          <th className="text-left py-2 text-halloween-text-secondary">Planets</th>
                          <th className="text-left py-2 text-halloween-text-secondary">Aspect</th>
                          <th className="text-left py-2 text-halloween-text-secondary">Angle</th>
                        </tr>
                      </thead>
                      <tbody>
                        {chartData.aspects.map((aspect: any, i: number) => (
                          <tr key={i} className="border-b border-halloween-border/30">
                            <td className="py-2 text-halloween-text-primary">
                              {aspect.planet1} - {aspect.planet2}
                            </td>
                            <td className="py-2 text-halloween-text-primary">{aspect.type}</td>
                            <td className="py-2 text-halloween-text-primary">{aspect.angle}°</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-halloween-card/50 rounded-lg border border-halloween-border p-4">
                  <h3 className="text-lg font-medium text-halloween-text-secondary mb-3">Chart Interpretation</h3>
                  <p className="text-sm text-halloween-text-primary">{chartData.interpretation}</p>
                </div>
              </div>
              
              <Dialog.Close asChild>
                <button className="absolute top-4 right-4 text-halloween-text-primary hover:text-halloween-text-secondary">
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