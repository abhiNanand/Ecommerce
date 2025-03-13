
export interface AppLayoutProps {
    isAuthenticated?: Boolean;
    children: string | JSX.Element | JSX.Element[] | ((any) => JSX.Element) | null;
}