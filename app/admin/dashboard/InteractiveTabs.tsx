"use client";
import { useState } from 'react';

type TabData = {
  key: string;
  label: string;
  rows: any[];
  columns: string[];
};

interface InteractiveTabsProps {
  tabData: TabData[];
}

export default function InteractiveTabs({ tabData }: InteractiveTabsProps) {
  const [activeTab, setActiveTab] = useState('seatrips');

  const activeTabData = tabData.find(tab => tab.key === activeTab);

  return (
    <div className="w-full">
      <div className="border-b">
        <div className="flex space-x-8">
          {tabData.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-3 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.key
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4">
        {activeTabData && (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b">
                  {activeTabData.columns.map((col) => (
                    <th key={col} className="px-4 py-2 text-left font-semibold text-gray-700">
                      {col.charAt(0).toUpperCase() + col.slice(1).replace('_', ' ')}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {activeTabData.rows.length > 0 ? (
                  activeTabData.rows.map((row: any, i: number) => (
                    <tr key={i} className="border-b hover:bg-gray-50">
                      {activeTabData.columns.map((col) => (
                        <td key={col} className="px-4 py-2">
                          {activeTabData.key === 'hotels' && col === 'location' && row[col] ? (
                            <a
                              href={`https://www.google.com/maps/search/${encodeURIComponent(row[col])}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 underline"
                            >
                              Location
                            </a>
                          ) : (
                            row[col] || 'N/A'
                          )}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={activeTabData.columns.length}
                      className="px-4 py-8 text-center text-gray-500"
                    >
                      No {activeTabData.label.toLowerCase()} data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
} 