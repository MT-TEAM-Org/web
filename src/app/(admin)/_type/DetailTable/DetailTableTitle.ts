export type TableInfo = {
  isList: boolean;
  type: string;
  title?: string;
  totalCount?: string;
  isUserDetail?: boolean;
};

export type ModalControls = {
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowPostModal: React.Dispatch<React.SetStateAction<boolean>>;
};