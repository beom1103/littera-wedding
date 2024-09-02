// 에셋 (이미지, 비디오 등)
export interface Asset {
  id: string;
  sectionId: string;
  category: string;
  fileId: string;
  originFile: string;
  thumbFile: string;
  sequence: number;
  selected: boolean;
}
