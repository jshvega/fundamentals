import { useState, useEffect } from "react"

export function usePersistedState<T>(key:string, initial:T, validate:(raw:string)=>T|null){
    const [value, setValue] = useState<T>(() => {
      const saved = localStorage.getItem(key)
      return saved !== null ? (validate(saved) ?? initial) : initial
    })
    useEffect(() => {
      localStorage.setItem(key, String(value))
    }, [key, value])
    return [value, setValue] as const
  }