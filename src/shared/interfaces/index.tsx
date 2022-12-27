export interface List {
  id: number;
  components: number[];
}

export interface ComponentOptions {
  text: string;
  variable: string;
  value: string;
}

export interface Component {
  id: number;
  type: string;
  options: ComponentOptions;
}

export interface Variable {
  name: string;
  type: string;
  initialValue: string;
  value?: string;
}

export interface Page {
  lists: List[];
  components: Component[];
  variables?: Variable[];
}
