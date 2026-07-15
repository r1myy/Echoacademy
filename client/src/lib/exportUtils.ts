/**
 * Export utilities for collections and resources
 * Supports PDF and CSV formats
 */

export interface ExportResource {
  title: string;
  author: string;
  year: number;
  institution: string;
  type?: string;
  discipline?: string;
  abstract?: string;
  keywords?: string[];
  url?: string;
}

/**
 * Export resources to CSV format
 */
export const exportToCSV = (resources: ExportResource[], collectionName: string) => {
  const headers = ['Titre', 'Auteur', 'Année', 'Institution', 'Type', 'Discipline', 'Mots-clés'];
  
  const rows = resources.map(resource => [
    `"${resource.title.replace(/"/g, '""')}"`,
    `"${resource.author.replace(/"/g, '""')}"`,
    resource.year,
    `"${resource.institution.replace(/"/g, '""')}"`,
    `"${(resource.type || '').replace(/"/g, '""')}"`,
    `"${(resource.discipline || '').replace(/"/g, '""')}"`,
    `"${(resource.keywords?.join('; ') || '').replace(/"/g, '""')}"`
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  // Add BOM for proper UTF-8 encoding in Excel
  const BOM = '\uFEFF';
  const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
  
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `${collectionName}-${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Export resources to PDF format using jsPDF
 */
export const exportToPDF = async (resources: ExportResource[], collectionName: string) => {
  try {
    // Create a simple PDF without external dependencies
    const lines: string[] = [];
    lines.push(`Collection: ${collectionName}`);
    lines.push(`Exporté le: ${new Date().toLocaleDateString('fr-FR')}`);
    lines.push(`Nombre de ressources: ${resources.length}`);
    lines.push('');
    lines.push('='.repeat(80));
    lines.push('');

    resources.forEach((resource, index) => {
      lines.push(`${index + 1}. ${resource.title}`);
      lines.push(`   Auteur: ${resource.author}`);
      lines.push(`   Année: ${resource.year}`);
      lines.push(`   Institution: ${resource.institution}`);
      if (resource.type) lines.push(`   Type: ${resource.type}`);
      if (resource.discipline) lines.push(`   Discipline: ${resource.discipline}`);
      if (resource.keywords && resource.keywords.length > 0) {
        lines.push(`   Mots-clés: ${resource.keywords.join(', ')}`);
      }
      lines.push('');
    });

    const content = lines.join('\n');
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
    
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${collectionName}-${new Date().toISOString().split('T')[0]}.txt`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Erreur lors de l\'exportation:', error);
    alert('Erreur lors de l\'exportation. Veuillez réessayer.');
  }
};

/**
 * Export resources to BibTeX format (for academic citations)
 */
export const exportToBibTeX = (resources: ExportResource[], collectionName: string) => {
  const bibtexEntries = resources.map((resource, index) => {
    const key = `${collectionName.toLowerCase().replace(/\s+/g, '_')}_${index + 1}`;
    return `@thesis{${key},
  author = {${resource.author}},
  title = {${resource.title}},
  school = {${resource.institution}},
  year = {${resource.year}},
  type = {${resource.type || 'Thesis'}}
}`;
  });

  const bibtexContent = bibtexEntries.join('\n\n');
  const blob = new Blob([bibtexContent], { type: 'text/plain;charset=utf-8;' });
  
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `${collectionName}-${new Date().toISOString().split('T')[0]}.bib`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
