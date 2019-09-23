import {moduleMetadata, storiesOf} from '@storybook/angular';
import {Component} from '@angular/core';
// NOTE: Do direct import instead of library (allows to watch component and easy to develop)
import {AtftModule} from '../../../projects/atft/src/lib/atft.module';
import {withKnobs} from '@storybook/addon-knobs';
import {worldSceneWrapper} from '../common/world-scene-wrapper';
import {DataCenterActorModule} from '../../../projects/atft/src/lib/actor/data-center/data-center-actor.module';
import {AnimationService} from '../../../projects/atft/src/lib/animation';


@Component({
  selector: 'app-storybook-box-mesh',
  template: worldSceneWrapper(`
    <atft-server-actor name="Server RX10" (render)="mainRenderer.render()"></atft-server-actor>
  `)
})
class StorybookServerComponent {

}

@Component({
  selector: 'app-storybook-box-mesh',
  template: worldSceneWrapper(`
    <atft-empty>

        <atft-layer-actor width="100" height="40" [translateZ]="0.5" [translateY]="-20" name="Servers A"
           (render)="mainRenderer.render()">
        </atft-layer-actor>
        <atft-layer-actor width="100" height="50" [translateZ]="0.5" [translateY]="30" name="Servers B"
           (render)="mainRenderer.render()">
        </atft-layer-actor>

        <atft-empty translateZ="0.5">
          <!-- Nodes: -->
          <atft-server-actor #rx10 name="RX10" translateY="-20" (render)="mainRenderer.render()" svgName="idea.svg">
          </atft-server-actor>
          <atft-server-actor #z001 name="Server Z001" translateY="-20" [translateX]="-30" svgName="grid-world.svg"
            (render)="mainRenderer.render()">
          </atft-server-actor>
          <atft-server-actor #tx71 name="Server TX71" translateY="30" [translateX]="-30" svgName="upload.svg"
            (render)="mainRenderer.render()">
          </atft-server-actor>
          <!-- Edges: -->
          <atft-empty translateZ="0.1">
            <atft-mesh-line-connector [source]="rx10" [target]="z001" materialColor="0xffffff" [lineWidth]="1"
                [transparent]="true" opacity="0.2" [animated]="true" [animationIncrement]="0.001"
                (render)="mainRenderer.render()">
            </atft-mesh-line-connector>
            <atft-mesh-line-connector [source]="z001" [target]="tx71" materialColor="0xffffff" [lineWidth]="1"
                [transparent]="true" opacity="0.2" [animated]="true" [animationIncrement]="-0.001"
                (render)="mainRenderer.render()">
             </atft-mesh-line-connector>
           </atft-empty>
         </atft-empty>
    </atft-empty>
  `)
})
class StorybookSceneComponent {

  constructor(private animationService: AnimationService) {
    this.animationService.start();
  }

  rx10Selected() {
    console.log('RX10 Selected!!!');
  }

}


storiesOf('Actor', module)
  .addDecorator(withKnobs)
  .addDecorator(
    moduleMetadata({
      imports: [
        AtftModule,
        DataCenterActorModule
      ],
      declarations: [
        StorybookServerComponent,
        StorybookSceneComponent
      ]
    }),
  )
  .add('actors', () => ({
    component: StorybookSceneComponent
  }))
  .add('server', () => ({
    component: StorybookServerComponent
  }))
;


