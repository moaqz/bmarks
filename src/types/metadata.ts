export interface Metadata {
  title: string;
  description: string;
  favicon: string;
  og_type: string;
  og_title: string;
  og_description: string;
  og_image: string;
};

export interface MetadataAPIResponse {
  data: Metadata;
}
