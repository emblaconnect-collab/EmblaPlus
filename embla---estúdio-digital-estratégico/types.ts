
// Fix: Added React import to resolve 'Cannot find namespace React' error for React.ReactNode
import React from 'react';

export interface NavLink {
  name: string;
  href: string;
  id: string;
}

export interface Solution {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  delay: number;
}

export interface Stat {
  value: string;
  label: string;
  delay: number;
}

export interface Step {
  number: string;
  title: string;
  description: string;
  delay: number;
}

export interface Project {
  category: string;
  title: string;
  image: string;
  delay: number;
  link?: string;
  features?: string[];
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}
