import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts";

const colors = {
  demon: {
    fill: "#ffc2c3",
    stroke: "#ff0101",
  },
  event: {
    fill: "#efb7e2",
    stroke: "#801767",
  },
  withValueEvent: {
    fill: "#cfefff",
    stroke: "#4cacdb",
  },
  action: {
    fill: "#adff83",
    stroke: "#1fc103",
  },
};
// ... tes imports et ton objet colors restent les mêmes

export default function BarChartPage() {
  const categoryData = [
    { name: "Cartes", created: 4, modified: 2, deleted: 1 },
    { name: "Règles", created: 0, modified: 1, deleted: 0 },
    { name: "Variables", created: 1, modified: 0, deleted: 1 },
    { name: "Événements", created: 1, modified: 0, deleted: 0 },
    { name: "Rôles", created: 1, modified: 0, deleted: 0 },
    { name: "Couleurs", created: 0, modified: 1, deleted: 0 },
    { name: "Affichages", created: 0, modified: 1, deleted: 0 },
  ];

  return (
    // On donne une hauteur fixe au parent pour que le ResponsiveContainer fonctionne
    <div style={{ width: "100%", height: "300px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={categoryData}
          barGap={50}// 
  barCategoryGap="50%"
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
               <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis dataKey="name" fontSize={12} />
                    <YAxis fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))", 
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px"
                      }}
                    />
          <Legend />
          <Bar
            dataKey="created"
            fill="#10b981"
            name="Créés"
            radius={[4, 4, 0, 0]}
            barSize={20} // Optionnel : pour contrôler la largeur des barres
          />
          <Bar
            dataKey="modified"
            fill="#f59e0b"
            name="Modifiés"
            radius={[4, 4, 0, 0]}
            barSize={20}
          />
          <Bar
            dataKey="deleted"
            fill="#ef4444"
            name="Supprimés"
            radius={[4, 4, 0, 0]}
            barSize={20}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
