# Emergency Transport Difficulty Data (FDMA Japan)

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

This repository provides CSV-formatted open data on "emergency transport difficulty cases" in Japan during the COVID-19 pandemic. The data is sourced from the Fire and Disaster Management Agency (FDMA) of the Ministry of Internal Affairs and Communications.

The original Excel data is automatically downloaded and converted into multiple, user-friendly CSV formats.

## Live Demos

- **[Prefectural Time-Series Dashboard](https://code4fukui.github.io/fdma_go_jp/)**: A line chart to visualize and compare the weekly trend of difficult cases across all prefectures.
- **[Prefectural Map Dashboard](https://code4fukui.github.io/fdma_go_jp/pref.html)**: A color-coded map of Japan showing the latest weekly case counts by prefecture.
- **[COVID-19 Correlation Graph](https://code4fukui.github.io/fdma_go_jp/withcovid19.html)**: A chart comparing emergency transport cases with national COVID-19 statistics, such as the number of hospitalized patients.

## Data Files

The data is processed into three levels of granularity, available via the following static URLs:

- **Nationwide Total**: [`emergencytransport_difficult_all.csv`](https://code4fukui.github.io/fdma_go_jp/emergencytransport_difficult_all.csv)
- **Per Prefecture**: [`emergencytransport_difficult_pref.csv`](https://code4fukui.github.io/fdma_go_jp/emergencytransport_difficult_pref.csv)
- **Per Fire Department**: [`emergencytransport_difficult.csv`](https://code4fukui.github.io/fdma_go_jp/emergencytransport_difficult.csv)

**Definition**: "Emergency transport difficulty cases" are incidents where an emergency squad had to make 4 or more hospital referrals and the on-scene time was 30 minutes or more, as reported by each fire department to the FDMA.

## Automated Workflow

The data is kept current using Deno scripts. To run the update process locally:

1.  **Download Source Data**  
    Fetches the latest `coronavirus_data.xlsx` file from the FDMA website.
    ```bash
    deno run --allow-net download.js
    ```

2.  **Process and Convert to CSV**  
    Reads the downloaded Excel file, cleans the data, and generates the three CSV files.
    ```bash
    deno run --allow-read --allow-write make.js
    ```

3.  **Update Repository (For Maintainers)**  
    Commits and pushes the updated data files to the GitHub repository.
    ```bash
    ./gitpush.sh
    ```

## Data Sources & Attribution

- **Primary Data Source**: [Fire and Disaster Management Agency (FDMA)](https://www.fdma.go.jp/disaster/coronavirus/post-1.html)
- **COVID-19 Data**: [Ministry of Health, Labour and Welfare (MHLW) Open Data](https://www.mhlw.go.jp/stf/covid-19/open-data.html)
- This project is maintained by [Code for FUKUI](https://code4fukui.github.io/).

## License

MIT License