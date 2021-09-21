export class BreadcrumbItem {
  public DisplayName: string;
  public Icon: string;
  public Badge: string;
  public Id: string;
  public ShowInDropdown: boolean;

  constructor(displayName: string, icon: string = '', badge: string = '', id?: string) {
    this.DisplayName = displayName;
    this.Icon = icon;
    this.Badge = badge;
    this.Id = id === undefined ? this.createId() : id;
    this.ShowInDropdown = false;
  }

  private createId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return 'id-' + v.toString(16);
    });
  }
}
