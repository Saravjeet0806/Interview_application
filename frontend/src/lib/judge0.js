const JUDGE0_API = "http://localhost:2358";

const LANGUAGE_VERSIONS = {
  javascript: { language_id: 63 }, // Node.js
  python: { language_id: 71 },
  java: { language_id: 62 },
};

/**
 * @param {string} language
 * @param {string} code
 * @returns {Promise<{success:boolean, output?:string, error?: string}>}
 */
export async function executeCode(language, code) {
  try {
    const languageConfig = LANGUAGE_VERSIONS[language];

    if (!languageConfig) {
      return {
        success: false,
        error: `Unsupported language: ${language}`,
      };
    }

    const response = await fetch(
      `${JUDGE0_API}/submissions?base64_encoded=false&wait=true`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source_code: code,
          language_id: languageConfig.language_id,
          stdin: "",
        }),
      }
    );

    if (!response.ok) {
      return {
        success: false,
        error: `HTTP error! status: ${response.status}`,
      };
    }

    const data = await response.json();

    const stdout = data.stdout || "";
    const stderr = data.stderr || "";
    const compile_output = data.compile_output || "";

    // Handle compile errors
    if (compile_output) {
      return {
        success: false,
        error: compile_output,
      };
    }

    // Handle runtime errors
    if (stderr) {
      return {
        success: false,
        output: stdout,
        error: stderr,
      };
    }

    return {
      success: true,
      output: stdout || "No output",
    };
  } catch (error) {
    return {
      success: false,
      error: `Failed to execute code: ${error.message}`,
    };
  }
}