import { Col, Row, Skeleton } from "antd";
import { LoadingSkeletonListCardProps } from "./models/LoadingSkeletonListCardModel";
import { createArray } from "@utils/arrayUtil";
import { LoadingOutlined } from "@ant-design/icons";

export default function LoadingSkeletonListCard(props: LoadingSkeletonListCardProps) {
  const { numberCard, childrenCard } = props;
  const listCard = createArray(numberCard ?? 6);

  const generateListCard = listCard.map(num => (
    <Col key={num}>
      <Skeleton.Node active>
        { childrenCard ?? <LoadingOutlined /> }
      </Skeleton.Node>
    </Col>
  ));

  return (
    <Row gutter={[32, 16]}>
      { generateListCard }
    </Row>
  );
}
