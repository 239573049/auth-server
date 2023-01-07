namespace Simple.Application.Permissions;

public static class SimplePermissions
{
    public const string Simple = "Simple";


    public class OpenIddictApplication
    {
        /// <summary>
        /// OpenIddictApplication
        /// </summary>
        public const string Default = Simple + ".OpenIddictApplication";

        /// <summary>
        /// 获取应用程序列表
        /// </summary>
        public const string List = Default + ".List";

        /// <summary>
        /// 编辑应用程序
        /// </summary>
        public const string Update = Default + ".Update";
    }
}
