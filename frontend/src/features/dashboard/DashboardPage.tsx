import { Card, Typography, List, Statistic, Row, Col, Spin } from "antd";
import { useDashboard } from "@/services/mutations/useDashboard";

const DashboardPage = () => {
  const { data, isLoading } = useDashboard();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <Spin size="large" />
      </div>
    );
  }

  const { total, latest, byCountry } = data!;

  return (
    <div className="p-6">
      <Row gutter={[16, 16]}>
        <Col xs={24} md={6}>
          <Card className="shadow-sm rounded-lg h-full">
            <Typography.Title level={5} className="text-gray-500">
              Total Company
            </Typography.Title>
            <Statistic
              value={total}
              suffix="adet"
              valueStyle={{ color: "#1677ff" }}
            />
          </Card>
        </Col>

        <Col xs={24} md={18}>
          <Card className="shadow-sm rounded-lg h-full">
            <Typography.Title level={5} className="text-gray-500">
              Last Added Companies
            </Typography.Title>
            <List
              dataSource={latest}
              renderItem={(item) => (
                <List.Item>
                  <div>
                    <div className="font-semibold">{item.name}</div>
                    <a
                      href={item.website}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-500 underline"
                    >
                      {item.website}
                    </a>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>

        <Col span={24}>
          <Card className="shadow-sm rounded-lg">
            <Typography.Title level={5} className="text-gray-500">
              Companies by Country
            </Typography.Title>
            <List
              style={{ maxHeight: 300, overflowY: "auto" }}
              dataSource={Object.entries(byCountry)}
              renderItem={([country, count]) => (
                <List.Item className="flex justify-between">
                  <span>{country}</span>
                  <span className="font-medium text-gray-700">{count}</span>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;
