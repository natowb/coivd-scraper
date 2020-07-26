import { ScrapeProvider } from "./ScrapeContext";
import { Text } from "react-native";
import React, { useEffect, useState } from "react";

function useScrapes() {
  const [scrapes, setScrapes] = useState({ worldwide: [] });

  useEffect(function () {
    (async () => {
      console.log("Mounting or Updating");
      const res = await fetch("http://192.168.178.31:2093/data");
      const data = await res.json();
      setScrapes(data);
    })();
  }, []);

  return scrapes;
}

export default function Page({ children }) {
  const scrapes = useScrapes();
  return <ScrapeProvider value={{ scrapes }}>{children}</ScrapeProvider>;
}
