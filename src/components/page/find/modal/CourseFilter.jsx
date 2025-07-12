import React, { useState, useMemo, useRef } from "react";
import {
  Button,
  Menu,
  Switch,
  Dropdown,
  Card,
  Space,
  Row,
  Col,
  Typography,
  Divider,
} from "antd";
import {
  DownOutlined,
  AppstoreOutlined,
  DollarOutlined,
  FilterOutlined,
  FireOutlined,
  TagsOutlined,
} from "@ant-design/icons";
import { Categories } from "@/data/mockData";

const { Title } = Typography;

const priceRanges = [
  { label: "Tất cả", min: null, max: null },
  { label: "Dưới 200.000đ", min: 0, max: 200000 },
  { label: "200.000đ - 500.000đ", min: 200000, max: 500000 },
  { label: "Trên 500.000đ", min: 500000, max: null },
];

const CourseFilter = ({ onClose, filters, setFilters }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const buttonRef = useRef(null);

  const updateFilters = (newValues) => {
    setFilters((prev) => ({
      ...prev,
      page: 1,
      ...newValues,
    }));
    if (onClose) onClose();
  };

  const handleCategorySelect = ({ key }) => {
    if (key === "") {
      updateFilters({ category: undefined, subcategory: undefined });
    } else if (key.startsWith("cat:")) {
      const category = key.replace("cat:", "");
      updateFilters({ category, subcategory: undefined });
    } else if (key.startsWith("sub:")) {
      const [, category, subcategory] = key.split(":");
      updateFilters({ category, subcategory });
    }
    setMenuVisible(false);
  };

  const handlePriceSelect = ({ key }) => {
    const [minStr, maxStr] = key.split(":");
    const min = minStr === "null" ? undefined : parseInt(minStr);
    const max = maxStr === "null" ? undefined : parseInt(maxStr);
    updateFilters({
      minPrice: min,
      maxPrice: max,
    });
  };

  const selectedCategory = useMemo(() => {
    if (!filters?.category) return "Tất cả";
    const categoryObj = Categories.find((c) => c.value === filters.category);
    if (!categoryObj) return "Tất cả";
    if (filters.subcategory) {
      const sub = categoryObj.subcategories?.find(
        (s) => s.value === filters.subcategory
      );
      return sub ? `${categoryObj.name} / ${sub.name}` : categoryObj.name;
    }
    return categoryObj.name;
  }, [filters]);

  const selectedPriceLabel = useMemo(() => {
    const found = priceRanges.find(
      (p) =>
        (p.min ?? null) === (filters.minPrice ?? null) &&
        (p.max ?? null) === (filters.maxPrice ?? null)
    );
    return found ? found.label : "Tất cả";
  }, [filters]);

  const renderCategoryMenu = () => {
    const menuItems = [
      {
        key: Categories[0].value,
        label: Categories[0].name,
      },
      ...Categories.slice(1).map((category) => ({
        key: `sub:${category.value}`,
        label: category.name,
        children: [
          {
            key: `cat:${category.value}`,
            label: `Tất cả ${category.name}`,
          },
          ...(category.subcategories?.map((sub) => ({
            key: `sub:${category.value}:${sub.value}`,
            label: sub.name,
          })) || []),
        ],
      })),
    ];

    return (
      <Menu
        onClick={handleCategorySelect}
        mode="vertical"
        style={{ maxHeight: 400, overflowY: "auto" }}
        items={menuItems}
      />
    );
  };

  const renderSwitchRow = (icon, label, key) => (
    <Card.Grid style={{ width: "100%", boxShadow: "none" }}>
      <Row justify="space-between" align="middle">
        <Col>
          <Space>
            {icon} {label}
          </Space>
        </Col>
        <Col>
          <Switch
            checked={filters?.[key] === true}
            onChange={(checked) =>
              updateFilters({
                [key]: checked ? true : undefined,
              })
            }
          />
        </Col>
      </Row>
    </Card.Grid>
  );

  return (
    <Card variant="outlined" style={{ background: "#fcfcfc" }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <div style={{ position: "relative" }} ref={buttonRef}>
            <Button
              block
              icon={<AppstoreOutlined />}
              onClick={() => setMenuVisible(!menuVisible)}
            >
              Danh mục: {selectedCategory} <DownOutlined />
            </Button>
            {menuVisible && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  zIndex: 999,
                  background: "white",
                  borderRadius: 4,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  minWidth: buttonRef.current?.offsetWidth,
                  marginTop: 8,
                }}
                onMouseLeave={() => setMenuVisible(false)}
              >
                {renderCategoryMenu()}
              </div>
            )}
          </div>
        </Col>

        <Col xs={24} sm={12}>
          <Dropdown
            menu={{
              items: priceRanges.map((range) => ({
                key: `${range.min ?? "null"}:${range.max ?? "null"}`,
                label: range.label,
              })),
              onClick: handlePriceSelect,
            }}
            trigger={["click"]}
          >
            <Button block icon={<DollarOutlined />}>
              Giá: {selectedPriceLabel} <DownOutlined />
            </Button>
          </Dropdown>
        </Col>
      </Row>

      <Divider style={{ margin: "24px 0 12px" }} />

      <Row gutter={[16, 16]}>
        <Col span={24}>
          {renderSwitchRow(<FilterOutlined />, "Nâng cao", "isAdvanced")}
          {renderSwitchRow(<TagsOutlined />, "Ưu đãi", "discountOnly")}
          {renderSwitchRow(<FireOutlined />, "Phổ biến", "popular")}
        </Col>
      </Row>
    </Card>
  );
};

export default CourseFilter;
