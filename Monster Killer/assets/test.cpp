//{ Driver Code Starts
// Initial Template for C++

#include <bits/stdc++.h>
using namespace std;

// } Driver Code Ends
// User function Template for C++

class disjointSet{

    vector<int>parent,size;
    public:
    disjointSet(int v){
         cout<<"hi"<<endl;
        parent.resize(v);
        size.resize(v,1);
        for(int i=0;i<v;i++){
            parent[i]=i;
        }
        
    }
    
    int findUPar(int node)
{
    if(parent[node]==node)return node;
    
    return parent[node]=findUPar(node);
}    

    void unionBySize(int u,int v){
        int ulp_u=findUPar(u);
        int ulp_v=findUPar(v);
        if(ulp_u==ulp_v)return;
        
        if(size[ulp_v]>size[ulp_u]){
            parent[ulp_u]==ulp_v;
            size[ulp_v]+=size[ulp_u];
        }
        else{
            parent[ulp_v]==ulp_u;
            size[ulp_u]+=size[ulp_v];
        }
    }
    
};

class Solution {
    
    private:
    
    bool check(int x, int y, int m, int n){
        if(x>=0 && x<m && y>=0 && y<n)return true;
        
        return false;
    }
    
  public:
    vector<int> numOfIslands(int n, int m, vector<vector<int>> &operators) {
        // code here
        vector<vector<int>>visited(n,vector<int>(m,0));
        vector<int>ans;
        int count=0;
        int delRow[]={-1,0,1,0};
        int delCol[]={0,1,0,-1};
        disjointSet s(m*n);
        cout<<"hi"<<endl;
        for(auto val:operators){
            int i=val[0];
            int j=val[1];
            if(visited[i][j]){ans.push_back(count);continue;}
            visited[i][j]=1;
            count++;
            for(int k=0;k<4;k++){
                int x=i+delRow[k];
                int y=j+delCol[k];
                if(check(x,y,m,n) && visited[x][y]){
                    if(s.findUPar(x*m+y)!=s.findUPar(i*m+j)){
                        cout<<"hi"<<endl;
                        s.unionBySize(x*m+y,i*m+j);
                        count--;
                    }
                }
            }
            
            ans.push_back(count);
            
        }
         return ans;
    }
};


//{ Driver Code Starts.
int main() {
    int t;
    cin >> t;
    while (t--) {
        int n,m,k; cin>>n>>m>>k;
        vector<vector<int>> a;
        
        for(int i=0; i<k; i++){
            vector<int> temp;
            for(int j=0; j<2; j++){
                int x; cin>>x;
                temp.push_back(x);
            }
            a.push_back(temp);
        }
    
        Solution obj;
        vector<int> res = obj.numOfIslands(n,m,a);
        
        for(auto x : res)cout<<x<<" ";
        cout<<"\n";
    }
}

// } Driver Code Ends