import * as React from 'react';
import { Tab } from '@headlessui/react';

export function Tabs({ value, onValueChange, children, className }: { value: string; onValueChange: (v: string) => void; children: React.ReactNode; className?: string }) {
  return (
    <Tab.Group selectedIndex={0} onChange={(i) => {
      const childArray = React.Children.toArray(children);
      const tabsListElement = childArray.find(
        (c): c is React.ReactElement => React.isValidElement(c) && c.type === TabsList
      );
      const tabTriggersRaw = (tabsListElement?.props as { children?: React.ReactNode })?.children;
      const tabTriggers: React.ReactElement[] = Array.isArray(tabTriggersRaw)
        ? tabTriggersRaw.filter(React.isValidElement)
        : React.isValidElement(tabTriggersRaw) ? [tabTriggersRaw] : [];
      const trigger = tabTriggers[i];
      if (trigger && trigger.props && typeof (trigger.props as { value?: unknown }).value === 'string') {
        onValueChange((trigger.props as { value: string }).value);
      }
    }}>
      <div className={className}>{children}</div>
    </Tab.Group>
  );
}

export function TabsList({ children }: { children: React.ReactNode }) {
  return <Tab.List className="flex gap-2 mb-4">{children}</Tab.List>;
}

export function TabsTrigger({ value, children }: { value: string; children: React.ReactNode }) {
  return (
    <Tab className={({ selected }) =>
      `px-4 py-2 rounded font-medium transition-colors ${selected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-accent'}`
    }>{children}</Tab>
  );
}

export function TabsContent({ value, children }: { value: string; children: React.ReactNode }) {
  return <Tab.Panel>{children}</Tab.Panel>;
} 