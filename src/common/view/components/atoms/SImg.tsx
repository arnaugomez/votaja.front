import { Component } from "react";
import Image, { ImageProps } from "next/image";
import Mesh1 from "/public/assets/mesh/mesh-1.png";
import Mesh2 from "/public/assets/mesh/mesh-2.png";
import Mesh3 from "/public/assets/mesh/mesh-3.png";
import Mesh4 from "/public/assets/mesh/mesh-4.png";

type Props = Omit<ImageProps, 'src'> & {
  src?: ImageProps["src"];
  fallback?: ImageProps["src"];
};

interface State {
  hasError: boolean;
  fallback: StaticImageData
}

const fallbackMap: Record<0 | 1 | 2 | 3, StaticImageData> = {
  0: Mesh4,
  1: Mesh1,
  2: Mesh2,
  3: Mesh3,
};

/** SafeImage is an image that never fails */
class SImg extends Component<Props, State> {
  state: State = { hasError: false, fallback: fallbackMap[Math.floor(Math.random()*4)] };

  render() {
    const { src = this.state.fallback, alt, fallback = this.state.fallback, ...props } = this.props;
    const imageSource = this.state.hasError || !src ? fallback : src;
    return (
      <Image
        alt={alt}
        src={imageSource}
        {...props}
        onError={this.handleError}
      />
    );
  }

  handleError = () => this.setState({ hasError: true });
}

export default SImg;
