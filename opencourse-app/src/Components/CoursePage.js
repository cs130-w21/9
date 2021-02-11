import React from 'react'
import { useLocation } from "react-router-dom";

export default function CoursePage() {
    const location = useLocation();
    const courseName = location.state.detail
    console.log({courseName})
  return (
    <div>course page {location.state.detail}</div>
  );
}