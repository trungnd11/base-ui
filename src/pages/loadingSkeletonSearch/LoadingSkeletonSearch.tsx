import { Col, Row, Skeleton, Space } from "antd";
import { LoadingSkeletonSearchWrapper } from "./styles/loadingSkeletonSearchStyle";
import { createArray } from "@utils/arrayUtil";

const listDataResult = createArray(10);

export default function LoadingSkeletonSearch() {
  const generateListResult = listDataResult.map(num => (
    <Row gutter={2} justify="space-between" key={num} style={{ marginTop: "1px" }}>
      <Col>
        <Skeleton.Input active block />
      </Col>
      <Col>
        <Skeleton.Input active block />
      </Col>
      <Col>
        <Skeleton.Input active block />
      </Col>
      <Col>
        <Skeleton.Input active block />
      </Col>
      <Col>
        <Skeleton.Input active block />
      </Col>
      <Col>
        <Skeleton.Input active block />
      </Col>
      <Col>
        <Skeleton.Input active block />
      </Col>
      <Col>
        <Skeleton.Input active block />
      </Col>
      <Col>
        <Skeleton.Input active block />
      </Col>
    </Row>
  ));

  return (
    <LoadingSkeletonSearchWrapper>
      <div className="wrapper-content-search">
        <Row gutter={[32, 16]}>
          <Col span={8}>
            <Skeleton.Input active block />
          </Col>
          <Col span={8}>
            <Skeleton.Input active block />
          </Col>
          <Col span={8}>
            <Skeleton.Input active block />
          </Col>
          <Col span={8}>
            <Skeleton.Input active block />
          </Col>
          <Col span={8}>
            <Skeleton.Input active block />
          </Col>
          <Col span={8}>
            <Skeleton.Input active block />
          </Col>
          <Col span={8}>
            <Skeleton.Input active block />
          </Col>
          <Col span={8}>
            <Skeleton.Input active block />
          </Col>
          <Col span={8}>
            <Skeleton.Input active block />
          </Col>
          <Col span={8}></Col>
          <Col span={8}></Col>
          <Col span={8}>
            <Space className="wrapper-button-search">
              <Skeleton.Button active />
              <Skeleton.Button active />
            </Space>
          </Col>
        </Row>
      </div>
      <div className="wrapper-result-search">
        <Skeleton.Input className="loading-header" active block />
        {
          generateListResult
        }
      </div>
      <div className="loading-footer">
        <Row>
          <Col span={8}></Col>
          <Col span={8}></Col>
          <Col span={8}>
            <Skeleton.Input active block />
          </Col>
        </Row>
      </div>
    </LoadingSkeletonSearchWrapper>
  );
}
