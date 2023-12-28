import { useQuery } from "@tanstack/react-query";

export type LinkPreviewType = {
  title: string;
  description: string;
  image: string;
  url: string;
};

const fetchFn = async ({ url }: { url: string }): Promise<LinkPreviewType> => {
  return JSON.parse(
    await fetch(`https://api.linkpreview.net/?q=${url}`, {
      headers: [["X-Linkpreview-Api-Key", import.meta.env.VITE_LINK_PREVIEW_API_KEY]],
    }).then((res) => res.text())
  );
};

export const useGetLinkPreviewQuery = ({ url }: { url: string }) => {
  return useQuery<LinkPreviewType>({
    queryKey: ["link-preview", url],
    enabled: !!url,
    queryFn: () => fetchFn({ url }),
  });
};
