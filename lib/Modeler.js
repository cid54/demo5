import inherits from "inherits-browser";

import BaseModeler from "./BaseModeler";

import Viewer from "./Viewer";
import NavigatedViewer from "./NavigatedViewer";

import KeyboardMoveModule from "diagram-js/lib/navigation/keyboard-move";
import MoveCanvasModule from "diagram-js/lib/navigation/movecanvas";
import ZoomScrollModule from "diagram-js/lib/navigation/zoomscroll";

import AlignElementsModule from "diagram-js/lib/features/align-elements";
import AutoScrollModule from "diagram-js/lib/features/auto-scroll";
import BendpointsModule from "diagram-js/lib/features/bendpoints";
import ConnectModule from "diagram-js/lib/features/connect";
import ConnectionPreviewModule from "diagram-js/lib/features/connection-preview";
import ContextPadModule from "./features/context-pad";
import CopyPasteModule from "./features/copy-paste";
import CreateModule from "diagram-js/lib/features/create";
import EditorActionsModule from "./features/editor-actions";
import GridSnappingModule from "./features/grid-snapping";
import KeyboardModule from "./features/keyboard";
import AutoplaceModule from "./features/auto-place";
import KeyboardMoveSelectionModule from "diagram-js/lib/features/keyboard-move-selection";
import LabelEditingModule from "./features/label-editing";
import ModelingModule from "./features/modeling";
import MoveModule from "diagram-js/lib/features/move";
import PaletteModule from "./features/palette";
import ResizeModule from "./features/resize";
import SnappingModule from "./features/snapping";
import GridModule from "diagram-js-grid";

const initialDiagram = `<?xml version="1.0" encoding="UTF-8"?>
<demo:definitions xmlns:demo="http://demo/schema/demo" xmlns:demoDi="http://demo/schema/demoDi">
    <demo:demoBoard id="Board" />
    <demoDi:demoRootBoard id="RootBoard">
        <odDi:demoPlane id="Plane" boardElement="Board" />
    </demoDi:demoRootBoard>
</demo:definitions>`;

export default function Modeler(options) {
  BaseModeler.call(this, options);
}

inherits(Modeler, BaseModeler);

Modeler.Viewer = Viewer;
Modeler.NavigatedViewer = NavigatedViewer;

/**
 * The createDiagram result.
 *
 * @typedef {Object} CreateDiagramResult
 *
 * @property {Array<string>} warnings
 */

/**
 * The createDiagram error.
 *
 * @typedef {Error} CreateDiagramError
 *
 * @property {Array<string>} warnings
 */

/**
 * Create a new diagram to start modeling.
 *
 * @returns {Promise<CreateDiagramResult, CreateDiagramError>}
 *
 */
Modeler.prototype.createDiagram = function () {
  return this.importXML(initialDiagram);
};

Modeler.prototype._interactionModules = [
  // non-modeling components
  KeyboardMoveModule,
  MoveCanvasModule,
  ZoomScrollModule,
];

Modeler.prototype._modelingModules = [
  // modeling components
  AutoplaceModule,
  AlignElementsModule,
  AutoScrollModule,
  BendpointsModule,
  ConnectModule,
  ConnectionPreviewModule,
  ContextPadModule,
  CopyPasteModule,
  CreateModule,
  EditorActionsModule,
  GridSnappingModule,
  GridModule,
  KeyboardModule,
  KeyboardMoveSelectionModule,
  LabelEditingModule,
  ModelingModule,
  MoveModule,
  PaletteModule,
  ResizeModule,
  SnappingModule,
];

// modules the modeler is composed of
//
// - viewer modules
// - interaction modules
// - modeling modules

Modeler.prototype._modules = [].concat(
  Viewer.prototype._modules,
  Modeler.prototype._interactionModules,
  Modeler.prototype._modelingModules
);
