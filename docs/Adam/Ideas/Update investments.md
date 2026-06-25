

On the manage-investments landing page, I want to introduce additional information, unit prices (the unit price and the units they hold - make the unit prices up for now, but make it feel right for the investment option it's associated with, and set it up so I can provide unit prices later) and asset allocation (provided below) for each investment option that the member is invested in. I want this to be a toggle that they turn on, not something that's always shown as it can be quite overwhelming for those who don't know what it means. 

For unit price I also want a view historic unit prices button (use the text button component) this will go to a new page that will list the historic unit prices of that investment option (use the table component, it needs to list 20 in a view and have pagination go 2 levels of pagination, the table will have Effective date and unit price listed with the most recent yesterdays date, as the top unit price. Make up the unit prices for now, as per note above)

For asset allocation, here is a breakdown of what the asset allocation is for each investment option 

Diversified options:

|Investment option|Australian shares|International shares|Unlisted assets & alternatives|Fixed income|Cash|
|---|---|---|---|---|---|
|**High Growth**|32.25%|33.25%|31.5%|1.0%|2.0%|
|**Balanced**|25.5%|27.25%|30.0%|15.25%|2.0%|
|**Conservative-Balanced**|17.25%|19.25%|26.0%|35.5%|2.0%|
|**Conservative**|8.5%|9.0%|25.5%|44.25%|12.75%|
|**Balanced Risk-Adjusted**|21.75%|23.75%|30.0%|23.5%|1.0%|
|**Socially Conscious Balanced**|25.5%|27.5%|28.0%|17.0%|2.0%|
|**High Growth Index**|39.75%|50.25%|n/a|10.0%|0.0%|
|**Balanced Index**|32.5%|42.5%|n/a|25.0%|0.0%|

Asset class options:

| Investment option               | Allocation                                                                                                   |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| **Australian Shares Index**     | 100% Australian Shares                                                                                       |
| **Intl. Shares Hedged Index**   | 100% International Shares                                                                                    |
| **Intl. Shares Unhedged Index** | 100% International Shares                                                                                    |
| **Listed Property Index**       | 100% Listed global property                                                                                  |
| **Unlisted Assets**             | Mostly unlisted (private) assets with a 5% strategic allocation to listed property to help manage liquidity. |
| **Bonds Index**                 | 100% Fixed income                                                                                            |
| **Cash**                        | 100% Cash                                                                                                    |

Lifecycle investment strategy:

| Pool                 | Australian shares | International shares | Unlisted assets & alternatives | Fixed income | Cash |
| -------------------- | ----------------- | -------------------- | ------------------------------ | ------------ | ---- |
| **High Growth Pool** | 32.25%            | 33.25%               | 31.5%                          | 1.0%         | 2.0% |
| **Balanced Pool**    | 25.5%             | 27.25%               | 30%                            | 15.25%       | 2.0% |
| **Cash Pool**        | n/a               | n/a                  | n/a                            | n/a          | 100% |
|                      |                   |                      |                                |              |      |


Never show both Unit Prices and Asset allocation at the same time, it needs to a one or the other. This information is to be associated with the individual investment option. 

Research how everything is setup first, and think about the problem and consider what the key challenges are and land on a recommended approach. I want you to document this research in the docs/Adam folder so I can then use it to build an implementation plan. 

Ask me clarifying questions as you go. Do not implement anything yet. 
