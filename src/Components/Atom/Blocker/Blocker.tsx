import { useEffect } from 'react';
import { unstable_useBlocker as useBlocker } from 'react-router-dom';

interface PromptProps {
  when: boolean;
  message: string;
}

/**
 * Prompt component for blocking navigation or reload if a condition is met.
 * @param when // when is a boolean value that determines whether the prompt should be displayed or not.
 * @param message // message is the message that will be displayed in the prompt.
 * @returns null (side-effect based component)
 */
function Prompt({ when, message }: PromptProps) {
  // Use unstable useBlocker from react-router-dom to block navigation
  useBlocker(() => {
    if (when) {
      return !window.confirm(message); // Show confirmation dialog for navigation
    }
    return false;
  });

  // Block page reload or close
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (when) {
        const confirmationMessage = message;
        // eslint-disable-next-line no-param-reassign
        event.returnValue = confirmationMessage; // Set the custom message
        return confirmationMessage;
      }
      return undefined; // Add a return statement at the end of the arrow function
    };

    if (when) {
      window.addEventListener('beforeunload', handleBeforeUnload);
    } else {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    }

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [when, message]);

  return null;
}

export default Prompt;
