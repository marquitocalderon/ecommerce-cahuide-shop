import { useEffect, useState } from 'react';

export default function useCookie(name: string): string | undefined {
  const [cookie, setCookie] = useState<string | undefined>(undefined);

  useEffect(() => {
    const cookieValue = document.cookie.split('; ')
      .find(row => row.startsWith(`${name}=`))?.split('=')[1];
    setCookie(cookieValue);
  }, [name]);

  return cookie;
}
