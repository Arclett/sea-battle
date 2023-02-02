export interface ElementInterface {
  tag: string;
  id?: string;
  classNote?: string;
  content?: string;
  disable?: boolean;
}

export interface InputElement {
  type: string;
  id?: string;
  classNote?: string;
  value?: string;
  content?: string;
  name?: string;
  disable?: boolean;
}
