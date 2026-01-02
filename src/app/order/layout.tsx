'use client';

import { ThemeProvider } from '@/contexts/ThemeContext';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Head from 'next/head';

export default function OrderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  
  useEffect(() => {
    // Extract restaurant name and barcode from path: /order/[restaurantName]/[barcode]
    const pathParts = pathname?.split('/').filter(Boolean);
    if (!pathParts || pathParts.length < 2) return;
    
    const barcode = pathParts[pathParts.length - 1];
    if (!barcode) return;

    const updateMetadata = async () => {
      try {
        const supabase = createClient();
        
        // Get table and restaurant info
        const { data: tableData } = await supabase
          .from('tables')
          .select('restaurant_id')
          .eq('barcode', barcode)
          .single();

        if (!tableData) return;

        const { data: restaurantData } = await supabase
          .from('restaurants')
          .select('name, logo_url')
          .eq('id', tableData.restaurant_id)
          .single();

        if (!restaurantData) return;

        // Update document metadata
        const title = `${restaurantData.name} - Order Menu`;
        document.title = title;

        // Update/Replace ALL favicons and icons with restaurant logo
        if (restaurantData.logo_url) {
          // Remove ALL existing link tags with icon relations
          const existingLinks = document.querySelectorAll("link[rel*='icon'], link[rel*='apple']");
          existingLinks.forEach(link => link.remove());

          // Add restaurant logo as primary favicon
          const favicon = document.createElement('link');
          favicon.rel = 'icon';
          favicon.type = 'image/png';
          favicon.href = restaurantData.logo_url;
          document.head.appendChild(favicon);

          // Add as apple-touch-icon
          const appleFavicon = document.createElement('link');
          appleFavicon.rel = 'apple-touch-icon';
          appleFavicon.href = restaurantData.logo_url;
          document.head.appendChild(appleFavicon);

          // Remove ALL existing Open Graph and Twitter meta tags
          const existingMeta = document.querySelectorAll(
            "meta[property^='og:'], meta[name^='twitter:']"
          );
          existingMeta.forEach(meta => meta.remove());

          // Add Open Graph tags with restaurant info
          const ogTitle = document.createElement('meta');
          ogTitle.setAttribute('property', 'og:title');
          ogTitle.setAttribute('content', title);
          document.head.appendChild(ogTitle);

          const ogImage = document.createElement('meta');
          ogImage.setAttribute('property', 'og:image');
          ogImage.setAttribute('content', restaurantData.logo_url);
          document.head.appendChild(ogImage);

          const ogDescription = document.createElement('meta');
          ogDescription.setAttribute('property', 'og:description');
          ogDescription.setAttribute('content', `Order from ${restaurantData.name}`);
          document.head.appendChild(ogDescription);

          // Add Twitter card tags
          const twitterCard = document.createElement('meta');
          twitterCard.setAttribute('name', 'twitter:card');
          twitterCard.setAttribute('content', 'summary_large_image');
          document.head.appendChild(twitterCard);

          const twitterTitle = document.createElement('meta');
          twitterTitle.setAttribute('name', 'twitter:title');
          twitterTitle.setAttribute('content', title);
          document.head.appendChild(twitterTitle);

          const twitterImage = document.createElement('meta');
          twitterImage.setAttribute('name', 'twitter:image');
          twitterImage.setAttribute('content', restaurantData.logo_url);
          document.head.appendChild(twitterImage);
        }

      } catch (error) {
        console.error('Failed to update metadata:', error);
      }
    };

    updateMetadata();
  }, [pathname]);

  return <ThemeProvider>{children}</ThemeProvider>;
}
