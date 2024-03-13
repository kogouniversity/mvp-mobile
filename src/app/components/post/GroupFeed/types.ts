export interface GroupPostsProps {
    groupName: string;
  }
  
  export interface PostData {
    id: number;
    attributes: {
      title: string;
      createdAt: string;
    };
  }
  
  export interface ListPostResponse {
    data: PostData[];
  }
  
  export interface OptionType {
    label: string;
    value: string;
  }
  
  export interface SelectFieldProps {
    label: string;
    data: OptionType[];
    onSelect: (option: OptionType) => void;
  }
  