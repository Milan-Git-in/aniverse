export type video = {
  title: string;
  videoId: string;
  url: string;
};

export type page = {
  results: video[];
  nextPageToken: string;
};
