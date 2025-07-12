"use client";
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../../components/ui/tabs';

type TabData = {
  key: string;
  label: string;
  rows: any[];
  columns: string[];
};

interface DashboardTabsProps {
  tabData: TabData[];
}

export default function DashboardTabs({ tabData }: DashboardTabsProps) {
  const [tab, setTab] = useState('seatrips');

  return (
    <Tabs value={tab} onValueChange={setTab} className="w-full">
      <TabsList>
        {tabData.map((t) => (
          <TabsTrigger key={t.key} value={t.key}>{t.label}</TabsTrigger>
        ))}
      </TabsList>
      {tabData.map((t) => (
        <TabsContent key={t.key} value={t.key}>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr>
                  {t.columns.map((col) => (
                    <th key={col} className="px-4 py-2 text-left font-semibold">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {t.rows.map((row: any, i: number) => (
                  <tr key={i} className="border-b">
                    {t.columns.map((col) => (
                      <td key={col} className="px-4 py-2">{row[col]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
} 