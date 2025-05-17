import { Card, Typography, List, Statistic } from "antd";

const total = 20;
const latest = [
  { name: "Alpha Corp", website: "https://alpha.com" },
  { name: "Beta Ltd", website: "https://beta.com" },
  { name: "Gamma GmbH", website: "https://gamma.com" },
];

const byCountry = {
  USA: 6,
  Germany: 4,
  UK: 3,
  France: 2,
  Canada: 2,
  Japan: 3,
};

const DashboardPage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      <Card className="shadow-sm rounded-lg">
        <Typography.Title level={5} className="text-gray-500">
          Toplam Şirket
        </Typography.Title>
        <Statistic
          value={total}
          suffix="adet"
          valueStyle={{ color: "#1677ff" }}
        />
      </Card>

      <Card className="shadow-sm rounded-lg">
        <Typography.Title level={5} className="text-gray-500">
          Son Eklenen Şirketler
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

      <Card className="shadow-sm rounded-lg">
        <Typography.Title level={5} className="text-gray-500">
          Ülkeye Göre Dağılım
        </Typography.Title>
        <List
          dataSource={Object.entries(byCountry)}
          renderItem={([country, count]) => (
            <List.Item className="flex justify-between">
              <span>{country}</span>
              <span className="font-medium text-gray-700">{count}</span>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default DashboardPage;
