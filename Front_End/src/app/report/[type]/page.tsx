"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import "./ReportPage.css";


type CategoryKey = 'calories' | 'water' | 'steps' | 'sleep' | 'workout' | 'weight';

const CATEGORIES: Record<CategoryKey, { 
  label: string; 
  unit: string; 
  color: string; 
  goal: number; 
  icon: string;
  isSum: boolean; 
}> = {
  calories: { label: 'Calories', unit: 'kcal', color: '#FFD700', goal: 2500, icon: '🔥', isSum: true },
  water:    { label: 'Water',    unit: 'ml',   color: '#00E0FF', goal: 3000, icon: '💧', isSum: true },
  steps:    { label: 'Steps',    unit: 'steps',color: '#2ed573', goal: 10000,icon: '👟', isSum: true },
  sleep:    { label: 'Sleep',    unit: 'hrs',  color: '#a55eea', goal: 8,    icon: '😴', isSum: true },
  workout:  { label: 'Workout',  unit: 'min',  color: '#ff7f50', goal: 60,   icon: '💪', isSum: true },
  weight:   { label: 'Weight',   unit: 'kg',   color: '#ff4757', goal: 75,   icon: '⚖', isSum: false },
};


type Entry = {
  id: string;
  item: string; 
  date: string;
  value: number;
};


const SmartGraph = ({ data, color, unit }: { data: { label: string, value: number }[], color: string, unit: string }) => {
  const height = 300;
  const width = 700;
  const padding = 60;
  const maxVal = Math.max(...data.map(d => d.value), 10) * 1.2; 

  const getPath = () => {
    if (data.length === 0) return { path: "", lastX: 0, points: [] };
    const xStep = (width - padding * 2) / (data.length - 1 || 1);
    const points = data.map((d, i) => ({
      x: padding + i * xStep,
      y: height - padding - (d.value / maxVal) * (height - padding * 2)
    }));

    let d = M ${points[0].x} ${points[0].y};
    for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i];
        const p1 = points[i+1];
        const midX = (p0.x + p1.x) / 2;
        d += ` C ${midX} ${p0.y}, ${midX} ${p1.y}, ${p1.x} ${p1.y}`;
    }
    return { path: d, lastX: points[points.length-1].x, points };
  };

  const { path: linePath, lastX, points } = getPath();
  const fillPath = linePath ? ${linePath} L ${lastX} ${height-padding} L ${padding} ${height-padding} Z : "";
   return (
    <div className="chart-container">
      <svg viewBox={0 0 ${width} ${height}} style={{width:'100%', overflow:'visible'}}>
        <defs>
          <linearGradient id={grad-${color}} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0.0" />
          </linearGradient>
        </defs>
        
        
        <text x="15" y="30" fontSize="12" fill="#888" textAnchor="middle" fontWeight="bold">
          {unit}
        </text>

        
        <line x1={padding} y1={padding} x2={padding} y2={height-padding} stroke="#555" strokeWidth="2" />
        
        
        <line x1={padding} y1={height-padding} x2={width-padding} y2={height-padding} stroke="#555" strokeWidth="2" />

        
        <text x={width/2} y={height-10} fontSize="12" fill="#888" textAnchor="middle" fontWeight="bold">
          Days
        </text>

        
        {[0, 0.25, 0.5, 0.75, 1].map((t, i) => {
          const yVal = Math.round(maxVal * (1 - t));
          const yPos = height - padding - (t * (height - padding * 2));
          return (
            <g key={y-${i}}>
              <line x1={padding-5} y1={yPos} x2={padding} y2={yPos} stroke="#555" strokeWidth="1" />
              <text x={padding-10} y={yPos+4} fontSize="11" fill="#aaa" textAnchor="end">
                {yVal}
              </text>
            </g>
          );
        })}
