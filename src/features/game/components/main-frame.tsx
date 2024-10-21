import Konva from "konva";
import { Layer, Rect, Stage, Text } from "react-konva";

export default function MainFrame() {
  return (
    <Stage width={640} height={480}>
      <Layer>
        <Text text="Hello, World!" fontSize={64} />
        <Rect x={20} y={20} width={50} height={50} fill={Konva.Util.getRandomColor()} />
      </Layer>
    </Stage>
  );
}
