import { useContext } from "react";
import UserContext from "./UserContext";

/**
 * Custom hook to access the UserContext
 * Must be used within a UserProvider
 */
export const useUser = () => {
	const context = useContext(UserContext);

	if(!context) {
			throw new Error('useUser must be used within a UserProvider');
	}

	return context;
}
