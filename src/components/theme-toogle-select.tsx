"use client";

import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export const ThemeToggleSelect = () => {
  const { theme, setTheme } = useTheme();
  
  return (
    <Select value={theme} onValueChange={setTheme}>
      <SelectTrigger className="w-[120px]">
        <SelectValue placeholder="Select a theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light"><SunIcon className="h-4 w-4" /> Light</SelectItem>
        <SelectItem value="dark"><MoonIcon className="h-4 w-4" /> Dark</SelectItem>
        <SelectItem value="system"><MonitorIcon className="h-4 w-4" /> System</SelectItem>
      </SelectContent>
    </Select>
  );
}