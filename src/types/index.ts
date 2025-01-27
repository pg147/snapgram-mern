export type INewUser = {
  name: string;
  email: string;
  password: string;
  username: string;
};

export type IUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  imageURL: string;
  bio: string;
};

export type IContextType = {
  user: IUser;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
};
