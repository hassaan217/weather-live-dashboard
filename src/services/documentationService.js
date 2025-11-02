// src/services/documentationService.js
// This would fetch documentation from your server or a CDN
const documentationFiles = {
  'README.md': '/docs/README.md',
  'ARCHITECTURE.md': '/docs/ARCHITECTURE.md',
  'COMPONENTS.md': '/docs/COMPONENTS.md',
  'DATA-FLOW.md': '/docs/DATA-FLOW.md',
  'SETUP.md': '/docs/SETUP.md',
  'API-REFERENCE.md': '/docs/API-REFERENCE.md',
  'FUTURE-ENHANCEMENTS.md': '/docs/FUTURE-ENHANCEMENTS.md'
};

export const getDocumentation = async (fileName) => {
  try {
    const response = await fetch(documentationFiles[fileName]);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.text();
  } catch (error) {
    console.error('Error fetching documentation:', error);
    throw error;
  }
};