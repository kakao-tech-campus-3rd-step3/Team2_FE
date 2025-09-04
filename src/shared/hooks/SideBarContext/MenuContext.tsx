import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type Menu = "대시보드" | "학습소스 관리" | "문제집 생성" | "나의 문제집" | "오답노트";

interface MenuContextType {
  selectedMenu: Menu;
  setSelectedMenu: (menu: Menu) => void;
}

// context 생성
const MenuContext = createContext<MenuContextType | undefined>(undefined);

// provider 정의
export function MenuProvider({ children }: { children: ReactNode }) {
  const [selectedMenu, setSelectedMenu] = useState<Menu>("대시보드");

  return (
    <MenuContext.Provider value={{ selectedMenu, setSelectedMenu }}>
      {children}
    </MenuContext.Provider>
  );
}

// 어떤 메뉴가 선택되었는지 쉽게 바꾸는 커스텀훅 useContext를 감싼
export function useMenu() {
  const context = useContext(MenuContext);
  if (!context) throw new Error("useMenu must be used within MenuProvider");
  return context;
}

