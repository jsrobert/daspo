import * as React from 'react';
import * as DC from 'office-ui-fabric-react/lib/DocumentCard';
import { IDocumentCardProps, DocumentCard, DocumentCardPreview, DocumentCardTitle, DocumentCardActivity } from 'office-ui-fabric-react/lib/DocumentCard';

export class DocumentCardExample extends React.Component<any, any> {
    constructor(props: IDocumentCardProps) {
      super(props);
      this._onClickHandler = this._onClickHandler.bind(this);
    }
  public render(): JSX.Element {
    return (
      <div className="ms-NavExample-LeftPane">
        {
        //   <DocumentCard onClickHref='http://bing.com'>
        //   <DocumentCardPreview previewImages = {
        //   [{
        //       previewImageSrc: require('./documentpreview.png'),
        //       iconSrc: require('./iconppt.png'),
        //       width: 318,
        //       height: 196,
        //       accentColor: '#ce4b1f'
        //   }]
        //   }
        //   />
        //   <DocumentCardTitle title = 'Revenue stream proposal fiscal year 2016 version02.pptx' />
        //   <DocumentCardActivity activity = 'Created Feb 23, 2016'
        //   people = {
        //   [{
        //       name: 'Kat Larrson',
        //       profileImageSrc: require('./avatarkat.png')
        //   }]
        //   }
        //   />
        // </DocumentCard>
      }
    </div>
    )
  }
  private _onClickHandler(e: React.MouseEvent<HTMLElement>): false {
    alert('test');
    return false;
  }
}