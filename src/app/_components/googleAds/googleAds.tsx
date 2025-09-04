'use client'
import Script from "next/script"
import { useEffect } from "react"

interface GoogleAdsScriptProps {
  clientId: string
}

/**
 * Injects the Google AdSense script into the page.
 * This component should be rendered once (e.g., in the layout or _app) to avoid duplicate script loading.
 *
 * @param clientId - Your Google AdSense publisher ID (e.g., "ca-pub-xxxxxxxxxxxxxxxx")
 */
export const GoogleAdsScript = ({ clientId }: GoogleAdsScriptProps) => {
  if (!clientId) return null;

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
};

interface GoogleAdsCustomProps {
  clientId: string;
  slotId?: string;
  format?: string;
  responsive?: boolean;
}

/**
 * Renders a custom Google AdSense ad unit.
 * Requires the AdSense script to be loaded beforehand via <GoogleAdsScript />.
 * Automatically pushes the ad configuration to the adsbygoogle queue on mount.
 *
 * @param clientId - Your Google AdSense publisher ID
 * @param slotId - Ad slot ID provided by Google AdSense
 * @param format - Ad format (e.g., "auto", "rectangle", etc.)
 * @param responsive - Whether the ad should be responsive (default: true)
 */
export const GoogleAdsCustom = ({
  clientId,
  slotId = "7701905080",
  format = "auto",
  responsive = true,
}: GoogleAdsCustomProps) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch (e) {
        console.error("AdSense push failed", e);
      }
    }
  }, []);

  if (!clientId) return null;

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client={clientId}
      data-ad-slot={slotId}
      data-ad-format={format}
      data-full-width-responsive={responsive.toString()}
    ></ins>
  );
};

export default { GoogleAdsScript, GoogleAdsCustom };
