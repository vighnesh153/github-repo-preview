export interface RepoFile {
  name: string;
  url: string;
  download_url: string;
  type: string;
}

export const RepoFileComparer = (file1: RepoFile, file2: RepoFile): number => {
  if (file1.type !== file2.type) {
    return file1.type === 'dir' ? -1 : 1;
  }
  return file1.name <= file2.name ? -1 : 1;
};
