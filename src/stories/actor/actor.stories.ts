import {moduleMetadata, storiesOf} from '@storybook/angular';
import {Component, EventEmitter, forwardRef, Input, Output} from '@angular/core';
// NOTE: Do direct import instead of library (allows to watch component and easy to develop)
import {AtftModule} from '../../../projects/atft/src/lib/atft.module';
import {defaultSceneWrapper} from '../common/default-scene-wrapper';
import {withKnobs} from '@storybook/addon-knobs';
import {EmptyComponent} from '../../../projects/atft/src/lib/objects/helpers';
import {AbstractObject3D} from '../../../projects/atft/src/lib/objects/abstract-object-3d';
import {worldSceneWrapper} from '../common/world-scene-wrapper';


@Component({
  selector: 'app-storybook-server-actor',
  providers: [{provide: AbstractObject3D, useExisting: forwardRef(() => ServerActorComponent)}],
  template: `
      <atft-empty>
          <atft-box-mesh height="10" width="10" depth="14" material="x" materialColor="0xffffff" [translateZ]="7">
          </atft-box-mesh>
          <atft-text-mesh [text]="name" [size]="2" [bevelEnabled]="false" height="0"
                          material="basic"
                          [translateX]="-7" [translateY]="-8" [translateZ]="0.2"
                          (render)="render.emit()"
          ></atft-text-mesh>
      </atft-empty>
  `
})
class ServerActorComponent extends EmptyComponent {
  // TODO: text align to center: dynamically calculate translateY
  @Input()
  name: string;

  @Output()
  render = new EventEmitter();

}


@Component({
  selector: 'app-storybook-box-mesh',
  template: worldSceneWrapper(`
    <app-storybook-server-actor name="Server RX10" (render)="mainRenderer.render()"></app-storybook-server-actor>
  `)
})
class StorybookServerComponent {

}

@Component({
  selector: 'app-storybook-box-mesh',
  template: worldSceneWrapper(`
    <atft-empty translateZ="0.1" translateY="-20">
        <!-- Nodes: -->
        <app-storybook-server-actor #rx10 name="Server RX10" (render)="mainRenderer.render()"></app-storybook-server-actor>
        <app-storybook-server-actor #z001 name="Server Z001" translateX="-30"></app-storybook-server-actor>
        <app-storybook-server-actor #tx71 name="Server TX71" translateX="-30" translateY="50"></app-storybook-server-actor>

        <!-- Edges: -->
        <atft-mesh-line-connector [source]="rx10" [target]="z001" materialColor="0x00AA00" [lineWidth]="1"
            (render)="mainRenderer.render()">
        </atft-mesh-line-connector>
        <atft-mesh-line-connector [source]="z001" [target]="tx71" materialColor="0xAA0000" [lineWidth]="1"
            (render)="mainRenderer.render()">
        </atft-mesh-line-connector>
    </atft-empty>
  `)
})
class StorybookSceneComponent {

}


storiesOf('Actor', module)
  .addDecorator(withKnobs)
  .addDecorator(
    moduleMetadata({
      imports: [
        AtftModule
      ],
      declarations: [
        ServerActorComponent,
        StorybookServerComponent,
        StorybookSceneComponent
      ]
    }),
  )
  .add('server', () => ({
    component: StorybookServerComponent
  }))
  .add('scene', () => ({
    component: StorybookSceneComponent
  }))
;


